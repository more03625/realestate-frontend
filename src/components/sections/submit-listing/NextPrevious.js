import React from 'react'

export default function NextPrevious({ prev, next }) {
    const prevTab = () => {
        document.getElementById(prev).click();
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        })
    }
    const nextTab = () => {
        document.getElementById(next).click();
        window.scrollTo({
            behavior: 'smooth',
            top: "10%"
        })
    }
    return (
        <>
            <div className="row">
                {
                    prev !== 0 ? (
                        <div className="col-md-6 form-group">
                            <button type="button" className="btn-custom btn-block" onClick={() => prevTab()}>Previous</button>
                        </div>
                    ) : ('')
                }

                {
                    next !== 0 ? (
                        <div className="col-md-6 form-group">
                            <button type="button" className="btn-custom btn-block" onClick={() => nextTab()}>Next</button>
                        </div>
                    ) : ('')
                }
            </div>
        </>
    )
}