import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, GraduationCap, ChevronRight, ShieldCheck, MessageCircle } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [formData, setFormData] = useState({ nome: '', whatsapp: '' });
  const [isFinished, setIsFinished] = useState(false);

  // Aqui é onde configuramos cada página/passo do seu Quiz.
  const steps = [
    {
      id: 'escolaridade',
      title: 'Qual etapa dos estudos você precisa concluir?',
      subtitle: 'Selecione a opção abaixo para descobrirmos a melhor forma de ajudar você a conquistar seu diploma.',
      type: 'choice',
      options: [
        'Ensino Fundamental',
        'Ensino Médio',
        'Ambos (Fundamental e Médio)',
        'Já terminei, quero fazer faculdade'
      ]
    },
    {
      id: 'tempo_parado',
      title: 'Há quanto tempo você parou de estudar?',
      subtitle: 'Isso nos ajuda a entender o seu momento e adaptar o seu plano de estudos.',
      type: 'choice',
      options: [
        'Menos de 1 ano',
        'De 1 a 3 anos',
        'De 3 a 5 anos',
        'Mais de 5 anos'
      ]
    },
    {
      id: 'idade',
      title: 'Qual é a sua idade?',
      subtitle: 'Para cursar o EJA, precisamos verificar se você atende à idade mínima exigida pelo MEC.',
      type: 'choice',
      options: [
        'Menos de 18 anos',
        'Entre 18 e 25 anos',
        'Entre 26 e 40 anos',
        'Mais de 40 anos'
      ]
    },
    {
      id: 'objetivo',
      title: 'Qual é o seu principal objetivo ao concluir os estudos?',
      subtitle: 'Queremos saber o que te motiva a dar esse passo importante.',
      type: 'choice',
      options: [
        'Conseguir um emprego melhor ou promoção',
        'Fazer uma Faculdade/Universidade',
        'Prestar Concurso Público',
        'Realização pessoal'
      ]
    },
    {
      id: 'investimento',
      title: 'Você tem a partir de R$ 89,90 por mês para investir no seu futuro?',
      subtitle: 'Oferecemos um método 100% online, reconhecido pelo MEC, onde você estuda no seu tempo, sem sair de casa, pagando menos que uma pizza por mês.',
      type: 'choice',
      options: [
        'Sim, quero investir no meu diploma!',
        'Consigo investir um valor próximo',
        'No momento não tenho condições'
      ]
    },
    {
      id: 'contato',
      title: 'Quase lá! Onde podemos enviar o seu passo a passo?',
      subtitle: 'Preencha seus dados para um de nossos especialistas entrar em contato pelo WhatsApp.',
      type: 'form'
    }
  ];

  const handleOptionClick = (option) => {
    setAnswers({ ...answers, [steps[currentStep].id]: option });
    
    // Pequeno atraso para o usuário ver que clicou antes de avançar
    setTimeout(() => {
      handleNext();
    }, 300); // Aumentei levemente o tempo para a animação ser percebida
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const redirectToWhatsApp = () => {
    const phoneNumber = "5531995783111";
    // Cria uma mensagem personalizada com base nas respostas
    let message = `Olá, vim pelo Quiz da ATIVA CURSO.\n\n*Meus dados:*\nNome: ${formData.nome}\nTelefone: ${formData.whatsapp}\n\n*Minhas respostas:*\n`;
    
    // Adiciona as respostas do quiz à mensagem
    steps.forEach(step => {
      if (step.type === 'choice' && answers[step.id]) {
        message += `- ${step.title} *${answers[step.id]}*\n`;
      }
    });

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    // Redireciona para o WhatsApp em uma nova aba
    window.open(whatsappUrl, '_blank');
  };

  const progressPercentage = ((currentStep) / steps.length) * 100;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl max-w-md w-full text-center space-y-6 animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
            <CheckCircle size={48} className="animate-pulse" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Tudo Certo, {formData.nome.split(' ')[0]}!</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Seu perfil foi analisado. Para liberar o seu passo a passo e falar com um especialista, clique no botão abaixo para nos chamar no WhatsApp.
          </p>
          
          <button 
            onClick={redirectToWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da34e] text-white font-bold text-xl py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-1"
          >
            <MessageCircle size={28} />
            Falar no WhatsApp
          </button>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
            <ShieldCheck size={18} className="text-green-500"/>
            <span>Atendimento rápido e 100% seguro.</span>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 selection:bg-blue-200">
      {/* Cabeçalho Premium */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200/50 px-4 py-4 flex items-center justify-center relative shadow-sm">
        {currentStep > 0 && (
          <button 
            onClick={handleBack} 
            className="absolute left-4 p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50 active:bg-blue-100"
            aria-label="Voltar"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <div className="flex items-center gap-2 text-blue-800 font-black text-xl tracking-tight uppercase">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <GraduationCap size={24} className="text-white" />
          </div>
          <span>ATIVA CURSO</span>
        </div>
      </header>

      {/* Área Principal */}
      <main className="flex-1 flex flex-col items-center p-4 sm:p-6 w-full max-w-xl mx-auto">
        
        {/* Barra de Progresso Aprimorada */}
        <div className="w-full mb-8 mt-2 sm:mt-6">
          <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 px-1 uppercase tracking-wider">
            <span>Seu Progresso</span>
            <span className="text-blue-600">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-200/80 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Card do Quiz com Animação de Troca Suave */}
        <div key={currentStep} className="w-full animate-in fade-in slide-in-from-right-4 duration-500 ease-out">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 mb-4 leading-tight tracking-tight">
              {currentStepData.title}
            </h1>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
              {currentStepData.subtitle}
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {currentStepData.type === 'choice' && currentStepData.options.map((option, index) => {
              const isSelected = answers[currentStepData.id] === option;
              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full group flex items-center justify-between p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 text-left font-semibold ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-lg shadow-blue-900/5 transform scale-[1.02]' 
                      : 'border-white bg-white hover:border-blue-200 hover:bg-slate-50 hover:shadow-md text-slate-700 shadow-sm'
                  }`}
                >
                  <span className="text-[17px] sm:text-lg">{option}</span>
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 group-hover:border-blue-300'
                  }`}>
                    {isSelected && <CheckCircle size={18} className="text-white animate-in zoom-in duration-200" />}
                  </div>
                </button>
              );
            })}

            {currentStepData.type === 'form' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/50 space-y-6 border border-slate-100">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 ml-1">Seu Nome Completo</label>
                  <input 
                    type="text" 
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    placeholder="Ex: João da Silva"
                    className="w-full p-4 bg-[#F8FAFC] border-2 border-slate-200 rounded-2xl focus:ring-0 focus:border-blue-600 text-slate-800 font-medium text-lg outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 ml-1">Seu WhatsApp</label>
                  <input 
                    type="tel" 
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    placeholder="(00) 00000-0000"
                    className="w-full p-4 bg-[#F8FAFC] border-2 border-slate-200 rounded-2xl focus:ring-0 focus:border-blue-600 text-slate-800 font-medium text-lg outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>
                <button 
                  onClick={handleNext}
                  disabled={!formData.nome || !formData.whatsapp}
                  className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold text-xl py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  Ver Meu Resultado
                  <ChevronRight size={24} />
                </button>
                <div className="flex items-center justify-center gap-2 mt-6 p-3 bg-green-50 rounded-xl">
                  <ShieldCheck size={20} className="text-green-600" /> 
                  <span className="text-xs sm:text-sm font-medium text-green-800">
                    Garantimos a privacidade dos seus dados.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
