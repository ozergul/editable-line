# simple-component-library
Ediatable text component for Reactjs. Uses two elements to edit texts: `Textarea` and `Input`.


When *type* is **Input**:

![When type is Input](https://media.giphy.com/media/ywHiBUv9o0RhVkpVni/giphy.gif)

When *type* is **Textarea**:

![When type is Textarea](https://media.giphy.com/media/4K02bcl3yidxbtqODo/giphy.gif)


# Installation
Run the following command:
```
npm install editable-line --save-dev
```

# How to use
Import EditableLine to your project:
``` js
import { EditableLine } from 'editable-line';
```

# Usage

Here you a simple example to see events available:

```jsx
import React from 'react';
import { EditableLine } from 'editable-line';

class Test extends React.Component {
    constructor(props) {
        super(props);

        this.handleFocus = this.handleFocus.bind(this);
        this.handleFocusOut = this.handleFocusOut.bind(this);
        this.handleFocusOutEmpty = this.handleFocusOutEmpty.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleFocus() {}
    handleFocusOut(value) { /*  new value */}
    handleFocusOutEmpty(oldValue) {}
    handleCancel(oldValue) {}

    render() {
        return (
            <EditableLine
                value={this.state.postTitle}
                escCancels={true}
                enterSaves={true}
                onFocus={this.handleFocus}
                onFocusOut={this.handleFocusOut}
                onFocusOutEmpty={this.handleFocusOutEmpty}
                onCancel={this.handleCancel}
                enterSaves={false}
                labelStyle={{"fontWeight": "bold", "cursor": "pointer"}}
            />
        );
    }
}

export default Test;
```

# Properties
``` js
EditableLine.propTypes = {
    type: PropTypes.string, /* input or textarea */
    inputType: PropTypes.string, /* text, password, number etc */
    value: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,
    allowEmpty: PropTypes.bool, /* if you okay with empty input/textarea value, set allowEmpty true */

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
    enterSaves: true
}
```