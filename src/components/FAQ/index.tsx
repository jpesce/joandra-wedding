import IconPlus from "../../../public/icon-plus.react.svg";
import questionList from "./data";

interface QuestionProps {
  question: string;
  answer: string;
}
const Question = ({ question, answer }: QuestionProps): JSX.Element => {
  return (
    <div className="border-t border-joanGreen-600">
      <details className="group">
        <summary className="flex cursor-pointer flex-wrap items-center space-x-2 py-4 pl-2 font-serif text-2xl">
          <IconPlus className="transition duration-500 ease-in-out group-open:rotate-[135deg]" />
          <p>{question}</p>
        </summary>
        <div className="px-[3.8rem] pb-8">{answer}</div>
      </details>
    </div>
  );
};

const FAQ = (): JSX.Element => {
  return (
    <div className="space-y-16 border-t border-joanGreen-600 p-20 text-joanGreen-600 selection:bg-joanGreen-600 selection:text-white">
      <div className="text-center font-serif text-4xl">
        Perguntas frequentes
      </div>
      <div className="m-auto max-w-[52rem] border-b border-joanGreen-600">
        {questionList.map((question, index) => (
          <Question
            key={index}
            question={question.question}
            answer={question.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
