import './HomePage.css';
import CodeBlockButton from "../../components/codeBlockButton/CodeBlockButton";
import Button from "../../components/Button/Button";

/**
 * Home Page Component
 * @description A React component representing the home page for code block selection and user mode switching.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.userState - The current user mode (e.g., 'Student' or 'Instructor').
 * @param {Array<string>} props.titles - An array of code block titles to be displayed as buttons.
 * @param {Function} props.getCodeBlock - A function to handle code block selection.
 * @param {Function} props.changeUserState - A function to switch the user mode.
 * @returns {JSX.Element} The JSX element representing the Home Page.
 */
const HomePage = (props) => {

    return (
        <div className={'home-page'}>
            <h1
                className={'home-page-header'}
            >Choose code block</h1>
            <h2
                className={'home-page-header2'}
            >{`${props.userState} mode`}</h2>
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
            <Button
                buttonType={'default'}
                onClick={props.changeUserState}
            >
                Change user type
            </Button>

        </div>
    );
};

export default HomePage;