// pages/api/login.js
export default function handler(req, res) {
    const usuarios = {
      'diretor': { senha: 'diretor', nivel: 'diretor' },
      'maycon': { senha: 'Pedr@gon2024', nivel: 'diretor' },
      'leo.coelho': { senha: 'pedragon@2024', nivel: 'diretor' },
      'tiago.vilaca': { senha: 'pedragon2024@', nivel: 'diretor' },
      'vendedor': { senha: 'vendedor', nivel: 'vendedor' },
      'gerente': { senha: 'gerente', nivel: 'gerente' }
    };
  
    if (req.method === 'POST') {
      const { username, password } = req.body;
  
      const usuario = usuarios[username];
      if (!usuario || usuario.senha !== password) {
        return res.status(401).json({ erro: 'Nome ou senha inválidos' });
      }
  
      // Login bem-sucedido
      return res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Método ${req.method} não permitido`);
    }
  }
  