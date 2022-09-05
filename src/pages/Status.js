import React from "react";
import styled from "styled-components";
import Card from "../component/Card";
import { Container } from "../globlaStyles";
import { useSelector, useDispatch } from "react-redux";
import { updateNCR } from "../redux/features/ncr/ncrSlice";
import BasicModal from "../utils/BasicModal";

const Headers = ["Initiated", "In Progress", "Review"];
const colors = ["black", "purple", "blue", "green"];

function Status() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.ncrs);
  const [id, setId] = React.useState();
  const [status, setStatus] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleDragEnter = (e, status) => {
    e.preventDefault();
    setStatus(status);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const data = {
      status,
      id,
    };
    if (id !== "") dispatch(updateNCR(data));
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <BasicModal open={open} setOpen={setOpen} />
      <StatusContainer>
        {Headers.map((header, id) => (
          <StatusItems
            key={id}
            onDragEnter={(e) => handleDragEnter(e, header)}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Header color={colors[id]}>{header}</Header>
            <Statusbody>
              {data.map(
                (item, index) =>
                  item.status === header && (
                    <Card
                      data={item}
                      key={index}
                      setId={setId}
                      index={index}
                      handleOpen={handleOpen}
                    />
                  )
              )}
            </Statusbody>
          </StatusItems>
        ))}
      </StatusContainer>
    </div>
  );
}

export default Status;

const StatusContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: start center;
  width: 100%;
  height: 80vh;
  gap: 20px;
`;

const StatusItems = styled.div`
  margin-top: 20px;
  width: 100%;
  border-radius: 0px;
  height: 90%;
  background-color: rgba(255, 255, 255, 0);
  border: 4px solid white;
  box-shadow: 10px 10px 83px -14px rgba(245, 245, 245, 1);
`;

const Header = styled.h3`
  text-align: center;
  background-color: ${(props) => props.color};
  padding: 20px;
  color: rgba(255, 255, 255, 0.8);
`;

const Statusbody = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;
