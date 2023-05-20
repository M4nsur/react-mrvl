import './charInfo.scss';
import Spinner from '../Spinner/Spinner';
import ErrorMsg from '../Error/ErrorMsg';
import Skeleton from '../skeleton/Skeleton'
import { Component } from 'react';
import MarvelService from '../../services/marvelServices';
import Utilities from '../../services/utilities';
class CharInfo extends Component {
    state = {
        char: null,
        loader: false,
        errorMsg: false,
    }

    getChar = new MarvelService()
    utilities = new Utilities

    componentDidMount() {
        this.updChar()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.charId !== this.props.charId) {
            this.updChar()
        }
    }

    updChar = async () => {
        const {charId} = this.props;
        if(!charId) {
            return
        }
        try {
            const char = await this.getChar.getCharacter(charId)
                this.setState({
                    char,
                    loader: false
                })
                console.log(this.state.char)
        } catch {
                this.setState({
                    loader: false,
                    errorMsg: true
            })
        }
    }


    
    render() {
        const {char, loading, error} = this.state;
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMsg/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char} utilities={this.utilities}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char, utilities}) => {
    const {name, descr, thumbnail, homepage, wiki, comics} = char;
    console.log(descr, comics)
    const classNameImg = utilities.hasThumbnail(thumbnail) ? null : "imgMod"
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} className={classNameImg}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {descr}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }                
            </ul>
        </>
    )
}

export default CharInfo;