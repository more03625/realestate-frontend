import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const Content = ({ setting }) => {
    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="post-content removeListStyleNone">
                            {ReactHtmlParser(setting && setting.content)}
                        </div>
                    </div>
                    {/* <div className="col-lg-4"> */}
                    {/* <Sidebar /> */}
                    {/* </div> */}
                </div>
            </div>
        </div>

    );
}

export default Content;