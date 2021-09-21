import React from 'react'

export default function Publishbtn({ currentPropertyID, loadingButton, isPublished }) {
    return (
        <>
            {
                currentPropertyID === 0 &&
                <button type="submit" className="btn-custom btn-block" name="submit" id="save_data" disabled={loadingButton}>
                    {isPublished === false ? 'Save as Draft' : 'Publish Property'}
                    {loadingButton === true ?
                        <div className="ml-1 spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                        </div> : ''
                    }
                </button>
            }
        </>
    )
}
