import { getIcon } from 'material-file-icons';

function FileIcon({ filename, style, className }) {
  return <div 
    style={style}
    className={className}
    dangerouslySetInnerHTML={{ __html: getIcon(filename).svg }}
  />;
}

export default FileIcon;