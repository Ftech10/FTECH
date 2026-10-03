require('dotenv').config();
const mysql=require('mysql2/promise'); const bcrypt=require('bcryptjs');
(async()=>{
 let c;
 try{
  c=await mysql.createConnection({host:process.env.DB_HOST||'localhost',port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER||'root',password:process.env.DB_PASSWORD||'',multipleStatements:true});
  const fs=require('fs'),path=require('path');
  await c.query(fs.readFileSync(path.join(__dirname,'../database/schema.sql'),'utf8'));
  await c.changeUser({database:process.env.DB_NAME||'fithtech'});
  const password=await bcrypt.hash('123456',10);
  const users=[['Lucas Souza','aluno@fithtech.com',password,'aluno'],['João Pedro','personal@fithtech.com',password,'personal'],['Administrador','admin@fithtech.com',password,'admin']];
  for(const u of users)await c.query('INSERT INTO usuarios(nome,email,senha_hash,perfil) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE nome=VALUES(nome),senha_hash=VALUES(senha_hash),perfil=VALUES(perfil)',u);
  const [rows]=await c.query("SELECT id,email FROM usuarios WHERE email IN ('aluno@fithtech.com','personal@fithtech.com')");
  const ids=Object.fromEntries(rows.map(x=>[x.email,x.id]));
  await c.query('INSERT INTO aluno_personal(aluno_id,personal_id,ativo) VALUES(?,?,1) ON DUPLICATE KEY UPDATE ativo=1',[ids['aluno@fithtech.com'],ids['personal@fithtech.com']]);
  const [existing]=await c.query('SELECT id FROM treinos WHERE aluno_id=? AND personal_id=? LIMIT 1',[ids['aluno@fithtech.com'],ids['personal@fithtech.com']]);
  if(!existing.length)await c.query('INSERT INTO treinos(aluno_id,personal_id,nome,foco,dias_semana) VALUES(?,?,?,?,?)',[ids['aluno@fithtech.com'],ids['personal@fithtech.com'],'Peito e Tríceps','Hipertrofia e força',3]);
  console.log('Banco FithTech criado e dados iniciais inseridos.');
 }catch(e){console.error('Erro:',e.message);process.exitCode=1}finally{if(c)await c.end();}
})();