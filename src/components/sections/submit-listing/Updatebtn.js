import React from 'react'

export default function Updatebtn({ currentPropertyID, loadingButton, isPublished }) {
    return (
        <>
            <div className="row">
                {
                    currentPropertyID > 0 &&
                    <div className="col-md-12 form-group">
                        <button type="submit" className="btn-custom btn-block" id="save_data" name="submit" disabled={loadingButton}>
                            {isPublished === false ? 'Save as Draft' : 'Publish Property'}
                            {loadingButton === true ?
                                <div className="ml-1 spinner-border spinner-border-sm" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> : ''
                            }
                        </button>
                    </div>
                }
            </div>

        </>
    )
}
