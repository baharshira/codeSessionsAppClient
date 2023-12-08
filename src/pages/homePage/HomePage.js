import './HomePage.css';
import CodeBlockButton from "../../components/codeBlockButton/CodeBlockButton";

const HomePage = (props) => {



    return (
        <div className={'home-page'}>
            <h1
                className={'home-page-header'}
            >Choose code block</h1>
            <section
                className={'code-blocks-titles'}
            >
                {props.titles.map((title) => (
                    <CodeBlockButton
                        key={title}
                        title={title}
                        onClick={props.getCodeBlock}
                    />
                ))}
            </section>
        </div>
    );
};

export default HomePage;
