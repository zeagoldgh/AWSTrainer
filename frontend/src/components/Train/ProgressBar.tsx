import './ProgressBar.css'

interface ProgressBarProps{
    currentPercent : number
}

export default function ProgressBar({currentPercent}:ProgressBarProps){
    return(
        <div className={'progress'}>
            <progress className="nes-progress is-success" value={currentPercent} max="100"></progress>
        </div>
    )
}