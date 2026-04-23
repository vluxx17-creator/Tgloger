// Внутри компонента Auth
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleAuth = async (type) => {
  if (type === 'signup') {
    await supabase.auth.signUp({ email, password });
    alert('Проверьте почту или попробуйте войти!');
  } else {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert('Ошибка входа: ' + error.message);
  }
};

// В верстке
<button onClick={() => handleAuth('login')} className="bg-[#0088cc] ...">Войти</button>
<button onClick={() => handleAuth('signup')} className="text-[#0088cc] ...">Зарегистрироваться</button>
