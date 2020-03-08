import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill, {Quill} from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';

/* 
 * Simple editor component that takes placeholder text as a prop 
 */
Quill.register('modules/imageResize', ImageResize);
class RichTextEditor extends React.Component {
  constructor (props) {
    super (props);
    
    // console.log('props in richtexteditor ', this.props.postDescription.replace('"<p>', '').replace('</p>"', ''));
    this.reactQuill = React.createRef();
    // this.state = {editorHtml: this.props.postDescription ? this.props.postDescription : ''};
    this.state = {editorHtml: ''};
    this.handleChange = this.handleChange.bind (this);
  }

  

  componentWillMount() {
    let Delta = ReactQuill.Quill.import('delta');

    this.setState({
      editorHtml: this.props.postDescription ? this.props.postDescription.replace(/\\"/g, '') : ''
    }, () => {
      // console.log('editorHtml afer delta insert ', this.state.editorHtml.replace(/\\"/g, ''));
      // this.reactQuill.current.setEditorContents(this.reactQuill.current.getEditor() ,this.state.editorHtml.replace(/\\"/g, ''));
      // this.reactQuill.current.editingArea.innerHTML = this.props.postDescription
    });


  }

  handleChange (html) {
    console.log('quill ref ', this.reactQuill);
    this.setState ({editorHtml: html}, () => {
      this.props.html (this.state.editorHtml);
      // console.log(this.state.editorHtml);
    });
  }

  render () {
    return (
      <ReactQuill
        ref={this.reactQuill}
        theme={'snow'}
        onChange={this.handleChange}
        value={this.state.editorHtml}
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
        placeholder={this.props.placeholder}
        style={{bounds: 'self'}}
      />
    );
  }
}

/* 
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
RichTextEditor.modules = {
  imageResize: {
    parchment: Quill.import('parchment'),
    displaySize: true,
  },
  toolbar: [
    [{header: [1, 2, false]}, {font: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  
};
/* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
RichTextEditor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'width',
  'height',
  'style',
  'alt',
  'image'
];

/* 
   * PropType validation
   */
RichTextEditor.propTypes = {
  placeholder: PropTypes.string,
};

export default RichTextEditor;
