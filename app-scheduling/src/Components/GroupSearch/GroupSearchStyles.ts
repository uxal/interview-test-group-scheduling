import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

export const GroupSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 100px;
  position: relative;
`;

export const SearchBox = styled.input`
  height: 40px;
  padding: 5px 30px 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
`;

export const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ResultItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 5px 5px 10px;

  &:hover {
    background: #eee;
  }
`;

export const ResultTitle = styled.div`
  font-weight: bold;
  color: #555;
  font-size: 13px;
`;

export const ResultAuthor = styled.div`
  color: #999;
  font-size: 11px;
`;

export const ClearButton = styled(IconButton)`
  position: absolute !important;
  top: 2px;
  right: 0;
`;
