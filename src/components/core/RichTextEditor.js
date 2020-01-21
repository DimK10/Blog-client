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
    this.state = {editorHtml: ''};
    this.handleChange = this.handleChange.bind (this);
  }

  handleChange (html) {
    this.setState ({editorHtml: html}, () => {
      this.props.html (this.state.editorHtml);
    });
  }

  render () {
    return (
      <ReactQuill
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
];

/* 
   * PropType validation
   */
RichTextEditor.propTypes = {
  placeholder: PropTypes.string,
};

export default RichTextEditor;
