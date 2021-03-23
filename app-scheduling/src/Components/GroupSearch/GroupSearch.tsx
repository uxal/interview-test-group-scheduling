import React, { useState, useRef, useEffect } from 'react';
import ClearIcon from '@material-ui/icons/Clear';

import {
  ClearButton,
  GroupSearchWrapper,
  ResultAuthor,
  ResultItem,
  ResultsWrapper,
  ResultTitle,
  SearchBox,
} from './GroupSearchStyles';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { search, selectFoundGroups } from '../../stores/autocompleteSlice';

const GroupSearch = () => {
  const dispatch = useDispatch();

  const results = useSelector(selectFoundGroups);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      setTimeout(() => {
        //@ts-ignore
        inputRef.current.focus();
      }, 100);
    }
  }, []);

  const handleKeyUp = debounce((e) => {
    console.log(e.target.value);
    const {
      target: { value },
    } = e;

    dispatch(search(value.length >= 3 ? value : ''));
  }, 200);

  const handleSearchBoxClear = () => {
    dispatch(search(''));
    //@ts-ignore
    inputRef.current.value = '';
  };

  return (
    <GroupSearchWrapper>
      <SearchBox
        placeholder="Search for groups"
        onKeyUp={handleKeyUp}
        ref={inputRef}
      />
      <ClearButton onClick={handleSearchBoxClear}>
        <ClearIcon />
      </ClearButton>
      {results.length > 0 && (
        <ResultsWrapper>
          {results.map((group) => (
            <ResultItem key={group.title}>
              <ResultTitle>{group.title}</ResultTitle>
              {group.author && (
                <ResultAuthor>{`${group.author.firstName} ${group.author.surname}`}</ResultAuthor>
              )}
            </ResultItem>
          ))}
        </ResultsWrapper>
      )}
    </GroupSearchWrapper>
  );
};

export default GroupSearch;
