import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react';
import MarvelService from '../../services/marvelServices';
import Utilities from '../../services/utilities';
import Spinner from "../Spinner/Spinner"
import ErrorMsg from '../Error/ErrorMsg';

class RandomChar extends Component{
    componentDidMount() {
        this.getRandomCharacter()
    }
    marvelService = new MarvelService()
    utilities = new Utilities()

    getRandomCharacter = async () => {
        this.setState({
            loader: true
        })
        try {
            const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
            const char = await this.marvelService.getCharacter(id)
            this.setState({
                randomChar:char,
                loader: false
            })
          } catch {
            this.setState({
                loader: false,
                errorMsg: true
            })
          }
    }
    state = {
        randomChar: {},
        loader: true,
        errorMsg: false,
    }

    render() {
        const {loader, errorMsg} = this.state;
        const error = errorMsg ?  <ErrorMsg/>: null
        const preLoader = loader? <Spinner/> : null
        const content = !(error || loader) ? <StaticView propState={this.state} utilities={this.utilities}/> : null
        return (
            <div className="randomchar">
                {preLoader}
                {error}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div onClick={()=> {this.getRandomCharacter()}} className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

    const StaticView = ({propState, utilities}) => {
        const {name, descr, thumbnail, homepage, wiki} = propState.randomChar
        const classNameImg = utilities.hasThumbnail(thumbnail) ?"randomchar__img" : "randomchar__img randomchar__notImg"
        
        return (
            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className={classNameImg} /><div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <div className="randomchar__descr">
                    {descr ? descr : <h3>Описание отсутсвует</h3>}
                </div>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
                </div>
            </div>
        )
    }

export default RandomChar;