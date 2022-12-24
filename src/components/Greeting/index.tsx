import Image from "next/image"

const Intro = (): JSX.Element => {
  return (
    <div className="border-t border-joanGreen-500 flex justify-center py-20 text-center selection:bg-joanGreen-500 selection:text-white">
      <div className="max-w-[36rem] uppercase text-joanGreen-500 space-y-6">
        <p>
          Vista uma roupa para se sentir especial e venha confortável para um dia de festa com música, bebidas, drinks, antepastos e comidinhas. Gostoso demais.Vista uma roupa para se sentir especial e venha confortável para um dia de festa com música, bebidas, drinks, antepastos e comidinhas. Gostoso demais.
        </p>
        <Image className="m-auto" src="/signatures.svg" alt="Chandra e João" width="290" height="46"/>
      </div>
    </div>
  )
}

export default Intro
