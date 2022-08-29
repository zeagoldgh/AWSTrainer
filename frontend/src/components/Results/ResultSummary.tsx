interface ResultSummaryProps{
    percentRight : number
}

export default function ResultSummary({percentRight}:ResultSummaryProps){
    return(
        <div className={'margin'}>
            <progress className={`nes-progress ${percentRight>79 ? 'is-success' : 'is-error'}`} value={percentRight} max="100"></progress>
            {
                percentRight>79 ?
                    <div>
                        <p>Weiter so!</p>
                        <i className="nes-icon trophy is-large"></i>
                    </div>
                    :
                    <div>
                        <p>Keep on keeping on!</p>
                        <i className="nes-kirby"></i>
                    </div>
            }
        </div>
    )
}