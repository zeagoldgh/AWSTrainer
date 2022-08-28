import '../../font.css'


interface SingleChoiceButtonProps{
    answer : string
    handleClick : ()=>void
    clicked : boolean
}

export default function SingleChoiceButton({answer,handleClick,clicked}:SingleChoiceButtonProps){
    return(
        <div>
            <button key={answer + (clicked?'a':'b')} type="button" className={`nes-btn ${clicked && 'is-success'} betterRead`} onClick={handleClick}>{answer}</button>
        </div>
    )
}