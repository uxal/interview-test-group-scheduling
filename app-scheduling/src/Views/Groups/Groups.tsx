import React from 'react';
import { useSelector } from 'react-redux';
import { selectGroups } from '../../stores/groupsSlice';

import { Wrapper, Card, SectionTitle } from '../../common-styles/CommonStyles';
import { Link } from 'react-router-dom';

import { GroupWrapper, GroupName } from './GroupsStyle';

const Groups = () => {
  const groups = useSelector(selectGroups);

  return (
    <Wrapper align="flex-start" column>
      <SectionTitle>Groups</SectionTitle>
      {groups && (
        <Wrapper inner noPadding>
          {groups.map((group) => (
            <Card key={group.id}>
              <GroupWrapper>
                <GroupName>{group.name}</GroupName>
                <Link to={`/group/${group.id}`}>Group calendar poll</Link>
              </GroupWrapper>
            </Card>
          ))}
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default Groups;
