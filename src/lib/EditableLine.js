import React from 'react';
import PropTypes from 'prop-types';

export default class EditableLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        	isEditing: this.props.isEditing || false,
			value: this.props.value || "",
			oldValue: this.props.value || "",
        };
        
        this._handleFocus = this._handleFocus.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._cancelEdit = this._cancelEdit.bind(this);
    }
    
    componentDidMount() {
        document.addEventListener('click', this._handleClickOutside, true);
        this.setState({oldValue: this.props.value})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.value && this.props.value !== nextProps.value){
            this.setState({
                value: nextProps.value
            });
        }
    }
    
    _handleKeyPress = (e) => {
        if (e.key === 'Enter' && this.props.enterSaves === true) {
            this._handleFocus();
        }
    }
        
    _handleKeyDown = (e) => {
        if (e.which === 27 && this.props.escCancels === true) {
            this._cancelEdit();
        }
    }

    _cancelEdit = (e) => {
        this.setState({
            isEditing: false,
            value: this.state.oldValue
        });
        if(typeof this.props.onCancel === 'function') this.props.onCancel(this.state.oldValue);
    }


    _handleFocus = (e) => {
    	if(this.state.isEditing) {
            if(typeof this.props.onFocusOut === 'function' 
                && this.state.value.length > 0 
                && this.state.value != this.state.oldValue) {
                this.setState({oldValue: this.state.value})
        		this.props.onFocusOut(this.state.value);
            } else {
                if(this.props.allowEmpty === true) {
                    this.setState({oldValue: this.state.value})
                    this.props.onFocusOut(this.state.value);
                } else {
                    this.setState({value: this.state.oldValue})
                    if(typeof this.props.onFocusOutEmpty === 'function') this.props.onFocusOutEmpty(this.state.oldValue);
                }
            }
        }
        else {
        	if(typeof this.props.onFocus === 'function') this.props.onFocus(this.state.value);
        }
    
    	this.setState({
        	isEditing: !this.state.isEditing,
        });
    }
	
    _handleChange() {
        this.setState({
            value: this.textInput.value,
        });
    }

    

    render() {
    	if(this.state.isEditing) {
            if(this.props.type === "textarea") {
                return  <div>
                    <textarea
                        className={this.props.className}
                        ref={(input) => { this.textInput = input; }}
                        value={this.state.value} 
                        onChange={this._handleChange}
                        onBlur={this._handleFocus}
                        maxLength={this.props.inputMaxLength}
                        placeholder={this.props.inputPlaceHolder}
                        tabIndex={this.props.inputTabIndex}
                        onKeyPress={this._handleKeyPress}
                        onKeyDown={this._handleKeyDown}
                        autoFocus
                        style={{...this.props.textareaStyle}}></textarea>
                    <div className="input-group mt-2">
                        <button onMouseDown={this._cancelEdit} className="btn btn-danger mr-2" type="button">X</button>
                        <button onMouseDown={this._handleFocus} className="btn btn-success" type="button">Save</button>
                    </div>
                </div>
            } else if(this.props.type === "input") {
                return <div className="input-group">

                    <div className="input-group-prepend">
                        <button onMouseDown={this._cancelEdit} className="btn btn-danger" type="button">{this.props.cancelText}</button>
                    </div>
                    <input type={this.props.inputType} 
                        className={this.props.className}
                        ref={(input) => { this.textInput = input; }}
                        value={this.state.value} 
                        onChange={this._handleChange}
                        onBlur={this._handleFocus}
                        maxLength={this.props.inputMaxLength}
                        placeholder={this.props.inputPlaceHolder}
                        tabIndex={this.props.inputTabIndex}
                        onKeyPress={this._handleKeyPress}
                        onKeyDown={this._handleKeyDown}
                        autoFocus
                        style={{...this.props.inputStyle}}
                    />
                    <div className="input-group-append">
                        <button onMouseDown={this._handleFocus} className="btn btn-success" type="button">{this.props.saveText}</button>
                    </div>
                </div>
            }
        }
    
        return <div>
            <span className={this.props.labelClassName} onClick={this._handleFocus} style={{...this.props.labelStyle}}>
                {this.props.labelPlaceholder && !this.state.value &&
                    <div dangerouslySetInnerHTML ={{ __html: this.props.labelPlaceholder }}></div>
                }
                {this.state.value}
            </span>
        </div>;
    }
}

EditableLine.propTypes = {
    type: PropTypes.string,
    inputType: PropTypes.string,
    value: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,
    allowEmpty: PropTypes.bool,

    escCancels: PropTypes.bool,
    enterSaves: PropTypes.bool,
    onBlurSaves: PropTypes.bool,

    labelClassName: PropTypes.string,
    className: PropTypes.string,

    inputMaxLength: PropTypes.number,
    inputPlaceHolder: PropTypes.string,
    inputTabIndex: PropTypes.number,

    onFocus: PropTypes.func,
    onFocusOut: PropTypes.func,
    onFocusOutEmpty: PropTypes.func,
    onCancel: PropTypes.func,

    labelStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    textareaStyle: PropTypes.object,

    saveText: PropTypes.string,
    cancelText: PropTypes.string,
};


EditableLine.defaultProps = {
    type: "input",
    onBlurSaves: true,
    saveText: "Save",
    cancelText: "x",
    escCancels: true,
    allowEmpty: false,
    enterSaves: true,
    className: "form-control"
}