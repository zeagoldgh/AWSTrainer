import '../../font.css'

interface QuestionBoxProps {
    text: string
}

export default function QuestionBox({text}: QuestionBoxProps) {
    return (
        <div className={"margin"}>
            <section className="nes-container is-rounded">
                <section className="message-list">
                    <section className="message -left">
                        <div className="nes-balloon from-left">
                            <h3 className={'betterRead'}>{text}</h3>
                        </div>
                        <i className="nes-ash"></i>
                    </section>
                </section>
            </section>
        </div>
    )
}