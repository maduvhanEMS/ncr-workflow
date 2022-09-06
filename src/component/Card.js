import React from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import moment from 'moment';

function Card({ data, index, setId, handleOpen }) {
  const colors = (priorityLevel) => {
    return priorityLevel.toLowerCase() === 'high'
      ? 'red'
      : priorityLevel.toLowerCase() === 'medium'
      ? 'orange'
      : 'white';
  };

  const statusColors = (status) => {
    return status.toLowerCase() === 'completed' ? 'blue' : 'rgba(0, 0, 0, 0.2)';
  };

  return (
    <CardContainer
      draggable
      onDragStart={() => setId(index)}
      backgroundcolor={colors(data.priorityLevel)}
      color={
        colors(data.priorityLevel) === 'white'
          ? 'rgba(0, 0, 0, 0.7)'
          : 'rgba(255, 255, 255, 0.8)'
      }
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardBody>
          <CardHeader>
            {data.descrtiption.length > 100
              ? data.descrtiption.substring(0, 100) + '...'
              : data.descrtiption}
          </CardHeader>
          <CardInfo>
            <span>Product Name: Propellant S365</span>
            <span>
              Priority Level:
              {' ' +
                data.priorityLevel[0].toUpperCase() +
                data.priorityLevel.slice(1, data.priorityLevel.length)}
            </span>
            <Items>
              {data.status === 'In Progress' &&
                data.data.map((item, idx) => (
                  <ItemInfo key={idx}>
                    {item.department}:
                    <CircleIcon sx={{ color: statusColors(item.status) }} />
                  </ItemInfo>
                ))}
            </Items>
          </CardInfo>
          <Details>
            <span>Initiated by: M Nemadandila </span>
            <span>{moment(new Date().now).fromNow()} </span>
          </Details>
        </CardBody>
        <IconButton
          sx={{ alignItems: 'flex-start', height: 40 }}
          onClick={handleOpen}
        >
          <MenuIcon />
        </IconButton>
      </div>
    </CardContainer>
  );
}

export default Card;

const CardContainer = styled.div`
  padding: 10px;
  min-height: 50px;
  background-color: ${(props) => props.backgroundcolor};
  box-shadow: 10px 10px 145px 0px rgba(255, 255, 255, 1);
  width: 100%;
  border-radius: 5px;
  cursor: move;
  margin: 2px;
  min-height: 150px;
  color: ${(props) => props.color};
`;

const CardBody = styled.div`
  text-justify: inter-word;
`;

const CardHeader = styled.p`
  font-weight: 500;
`;

const Details = styled.div`
  span {
    font-size: 12px;
    font-style: italic;
    // color: rgba(0, 0, 0, 0.7);
  }
`;

const CardInfo = styled.div`
  // color: rgba(0, 0, 0, 0.7);
  font-weight: 600;
  font-size: 14px;
  padding: 4px 0;
  display: flex;
  flex-direction: column;
  span {
    margin: 2px;
  }
`;

const Items = styled.div`
  display: flex;
  font-weight: 500;
  padding: 2px 5px;
  margin-top: 5px;
  justify-content: space-between;
`;

const ItemInfo = styled.span`
  display: flex;
  padding: 0 1px;

  span {
    margin: 1px;
  }
`;
