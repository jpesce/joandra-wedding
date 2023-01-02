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
        <summary className="flex cursor-pointer space-x-2 py-4 pl-2 font-serif text-2xl">
          <IconPlus className="h-[42px] shrink-0 self-start transition duration-500 ease-in-out group-open:rotate-[135deg]" />
          <p className="pt-[0.475rem]">{question}</p>
        </summary>
        <div className="px-[3.7rem] pb-8">{answer}</div>
      </details>
    </div>
  );
};

const FAQ = (): JSX.Element => {
  return (
    <div className="space-y-16 border-t border-joanGreen-600 px-8 py-10 text-joanGreen-600 selection:bg-joanGreen-600 selection:text-white md:p-20">
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
