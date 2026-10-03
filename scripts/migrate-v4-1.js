require('dotenv').config();
const db=require('../db');
(async()=>{const c=await db.getConnection();try{
  const [cols]=await c.query("SHOW COLUMNS FROM progresso LIKE 'exercicio_nome'");
  if(!cols.length) await c.query("ALTER TABLE progresso ADD COLUMN exercicio_nome VARCHAR(120) NULL AFTER exercicio_id");
  const [cols2]=await c.query("SHOW COLUMNS FROM progresso LIKE 'treino_nome'");
  if(!cols2.length) await c.query("ALTER TABLE progresso ADD COLUMN treino_nome VARCHAR(120) NULL AFTER exercicio_nome");
  await c.query(`UPDATE progresso p JOIN exercicios e ON e.id=p.exercicio_id JOIN treinos t ON t.id=e.treino_id SET p.exercicio_nome=COALESCE(p.exercicio_nome,e.nome),p.treino_nome=COALESCE(p.treino_nome,t.nome)`);
  // Recuperação conservadora de histórico legado: só infere quando o aluno possui exatamente um exercício ativo possível.
  const [orphans]=await c.query(`SELECT p.id,p.aluno_id FROM progresso p WHERE p.exercicio_id IS NULL AND (p.exercicio_nome IS NULL OR p.treino_nome IS NULL)`);
  for(const o of orphans){
    const [cand]=await c.query(`SELECT e.nome exercicio,t.nome treino FROM exercicios e JOIN treinos t ON t.id=e.treino_id WHERE t.aluno_id=? AND t.ativo=1 ORDER BY t.criado_em DESC,e.ordem,e.id`,[o.aluno_id]);
    if(cand.length===1) await c.query('UPDATE progresso SET exercicio_nome=?,treino_nome=? WHERE id=?',[cand[0].exercicio,cand[0].treino,o.id]);
  }
  console.log('FithTech V4.1: histórico e contadores corrigidos sem apagar dados.');
}catch(e){console.error('Erro na correção V4.1:',e.message);process.exitCode=1}finally{c.release();await db.end()}})();
