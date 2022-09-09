import React from "react";
import styled from "styled-components";
import Card from "../component/Card";
import { Container } from "../globlaStyles";
import { useSelector, useDispatch } from "react-redux";
import { updateNCR } from "../redux/features/ncr/ncrSlice";
import BasicModal from "../utils/BasicModal";
import { createBrowserHistory } from "history";

const Headers = ["Initiated", "In Progress", "Review", "Approved"];
const colors = ["black", "purple", "blue", "green", "green"];

function Workflow() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.ncrs);
  const [id, setId] = React.useState();
  const [status, setStatus] = React.useState();
  const [open, setOpen] = React.useState(false);
  const history = createBrowserHistory();

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

  const handleOpen = (id, header) => {
    setOpen(true);
    history.push(`/${header}?id=${id}`);
  };

  const handleStart = (e, index) => {
    e.preventDefault();
    setId(index);
  };
  return (
    <Container>
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
                      handleStart={handleStart}
                      index={index}
                      id={item.id}
                      handleOpen={handleOpen}
                      header={header}
                    />
                  )
              )}
            </Statusbody>
          </StatusItems>
        ))}
      </StatusContainer>
    </Container>
  );
}

export default Workflow;

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
