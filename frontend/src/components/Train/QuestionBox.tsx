import '../../font.css'

interface QuestionBoxProps {
    text: string
    toChoose : number
}

export default function QuestionBox({text,toChoose}: QuestionBoxProps) {
    return (
        <div className={"margin"}>
            <section className="nes-container is-rounded">
                <section className="message-list">
                    <section className="message -left">
                        <div className="nes-balloon from-left">
                            <h3 className={'betterRead'}>{text}</h3>
                            {toChoose>1 ? <p>{`Choose ${toChoose} answers`}</p> : <p>Single Choice</p>}
                        </div>
                        <i className="nes-ash"></i>

                    </section>
                </section>
            </section>
        </div>
    )
}