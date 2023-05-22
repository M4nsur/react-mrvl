import './charList.scss';
import Utilities from '../../services/utilities';
import { Component } from 'react';
import MarvelService from '../../services/marvelServices';
import Spinner from '../Spinner/Spinner'
import ErrorMsg from '../Error/ErrorMsg';
class CharList extends Component {
    componentDidMount() {
        this.getCharacter()
    }
    
    marvelService = new MarvelService()
    utilities = new Utilities

    state = {
        chars: [],
        loader: true,
        errorMsg: false,
        offsetCount: 1,
        isLoadingBtn: false
    }

    getCharacter = async(offset) => {
        const {offsetCount, chars} = this.state
        try {
            this.setState({
                isLoadingBtn: true
            })
            const res = await this.marvelService.getAllCharacter(offset)
            this.setState({
                chars: [...chars,...res.data.results],
                loader: false,
                offsetCount: offsetCount + 9,
                isLoadingBtn: false
            })
        } catch(err) {
            this.setState({
                loader: false,
                errorMsg: true
            })
        }
    }

    classNameImg(el) {
        return this.utilities.hasThumbnail(el.thumbnail.path) ? null : "char__item__img"
    }

    pathToImg(el) {
        return `${el.thumbnail.path}.${el.thumbnail.extension}`
    }
    
    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }
    
    renderChars(arr) {
        const {onSelectChar} = this.props
        return arr.map((el, i) => {
            return (
            <li 
                key={el.id} 
                className="char__item" 
                tabIndex={0}
                ref={this.setRef}
                onClick={()=> {
                    onSelectChar(el.id); 
                    this.focusOnItem(i);}}
                    >
                <img src={this.pathToImg(el)} className={this.classNameImg(el)} alt={el.name}/>
                <div className="char__name">{el.name}</div>
            </li>
            )
        })
    }
    render() {
        const {chars, loader, errorMsg, isLoadingBtn} = this.state
        const renderChars = this.renderChars(chars)
        const preLoader = loader ? <Spinner/> : null
        const error = errorMsg ? <ErrorMsg/> : null
        const content = !(error || loader) ? renderChars: null

        return (
            <>
            <div className="char__list">
            <ul className="char__grid">
            {preLoader}
            {error}
            {content}
            </ul>
            <button onClick={
                ()=> this.getCharacter(this.state.offsetCount)} 
                className="button button__main button__long"
                disabled={isLoadingBtn}
                style={isLoadingBtn? {opacity: 0.33}: null}
                >
                    <div className="inner">load more</div>
            </button>
            </div>
            </>
        )
    }
}


export default CharList;