import Image from "next/image"
import PlusIcon from "../../../public/plus.svg"

const QUESTIONS = [
  {
    "question": "Que hora começa de verdade?",
    "answer": "Vamos ter um momento no início para brindar, ficaríamos muito felizes se todos vocês estivessem lá nessa hora. Então ela começa de verdade às 15h, mas se organize para chegar 14h30, beber um café e se aclimatar logo cedo."
  },
  {
    "question": "Posso levar alguém que não está na lista? Por favorzinho?",
    "answer": "Não, e não é não mesmo. Adoraríamos ter outros amigos especiais nessa celebração, mas tivemos que seguir um limite de ocupação do espaço. Por isso fizemos uma seleta curadoria de pessoas e cada um de vocês é fundamental pra gente."
  },
  {
    "question": "Vai ter chinelo?",
    "answer": "Não, a gente recomenda que você vá com um sapato pra curtir a festa toda! Mas pode levar seu chinelo para trocar quando quiser se achar melhor ;)"
  },
  {
    "question": "E blusa de frio, preciso levar?",
    "answer": "Agosto em BH costuma fazer frio de noite. Então melhor garantir uma blusinha, mesmo se o dia estiver quente."
  },
  {
    "question": "Preciso ir de salto, gravata, vestido longo?",
    "answer": "Não precisa. Queremos todo mundo lindo e à vontade. Vista-se para se sentir especial, do seu jeito, para celebrar esse dia único com a gente! "
  },
  {
    "question": "Como vai ser a comida lá? É verdade que só vai ter comida natureba?",
    "answer": "Vamos ter uma mesa de antepastos no melhor estilo cada um por si, pra agradar todos os paladares. E pro jantar tem opções vegetarianas/veganas e com carne, dá pra ver as opções de prato lá em cima."
  },
  {
    "question": "Posso fazer um Pix direto pra vocês como presente?",
    "answer": "Lógico, nossa chave é o CPF. Do João é 089.745.156-28 e da Chandra é 115.632.206-52. Nos mande uma mensagem para sabermos que estamos recebendo esse presente de você."
  },
  {
    "question": "Posso levar minha própria bebida?",
    "answer": "A gente pensou em muitas opções, mas se nenhuma delas te apetecer, pode sim levar sua bebida. Só não prometemos que terá um copo ou taça especial para ela."
  },
  {
    "question": "A festa termina que hora?",
    "answer": "Como a festa será em uma área residencial, existe um limite de horário. Então se precisar se programar, nossa hora limite é 22h. Por isso chegue cedo!"
  },
]

interface QuestionProps {
  question: string,
  answer: string,
}

const Question = ({ question, answer }: QuestionProps): JSX.Element => {
  return (
    <div className="border-t border-joanGreen-500">
      <details className="group">
        <summary className="font-serif py-4 text-2xl flex flex-wrap items-center space-x-2 pl-2 cursor-pointer"><Image src={PlusIcon} alt="+" className="group-open:rotate-[135deg] transition duration-500 ease-in-out" /> <p>{question}</p></summary>
        <div className="px-[3.8rem] pb-8">{answer}</div>
      </details>
    </div>
  )
}

const FAQ = (): JSX.Element => {
  return (
    <div className="p-20 border-t border-joanGreen-500 space-y-16 text-joanGreen-500 selection:bg-joanGreen-500 selection:text-white">
      <div id="FAQ" className="font-serif text-4xl text-center">Perguntas frequentes</div>
      <div className="max-w-[52rem] border-b border-joanGreen-500 m-auto">
        {QUESTIONS.map((question, index) =>
          <Question key={index} question={question.question} answer={question.answer} />)}
      </div>
    </div>
  )
}

export default FAQ
