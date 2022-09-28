import React, { useState } from "react";
import styled from "styled-components";
import Card from "../component/Card";
import { Container } from "../globlaStyles";
import { useSelector, useDispatch } from "react-redux";
import { updateNCR } from "../redux/features/ncr/ncrSlice";
import BasicModal from "../utils/BasicModal";
import { createBrowserHistory } from "history";
import ProgressForm from "../component/forms/ProgressForm";

const Headers = ["Initiated", "In Progress", "Review", "Approved"];
const colors = ["black", "purple", "blue", "green", "green"];

function Workflow() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.ncrs);
  const [id, setId] = React.useState();
  const [status, setStatus] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const history = createBrowserHistory();
  const [checkDrop, setCheckdrop] = useState(0);
  const [stage, setStage] = useState("");

  const handleDragEnter = async (e, status) => {
    e.preventDefault();
    setStatus(status);

    //check the status number
    const draggedData = await data.findIndex((item) => item.id === id);
    const statusDragged = await data[draggedData].status;
    if (
      Headers.indexOf(status) - Headers.indexOf(statusDragged) >= 1 &&
      Headers.indexOf(status) - Headers.indexOf(statusDragged) < 2
    ) {
      setCheckdrop(1);
    } else {
      setCheckdrop(0);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();

    const updateData = {
      status,
      id,
    };
    if (checkDrop !== 0) {
      //check if we are dropping it at In progress
      if (status === "In Progress") {
        //check if the data is populated
        const index = await data.findIndex((item) => item.id === id);

        if (!data[index].details.length > 0) {
          setOpen(true);
        } else {
          dispatch(updateNCR(updateData));
        }
      } else {
        dispatch(updateNCR(updateData));
      }
    }
    //Assign the responsible person
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleOpen = (id, header) => {
    setOpen(true);
    setId(id);
    setStage(header);
    history.push(`?${header}?id=${id}`);
  };

  const handleStart = (e, index) => {
    // e.preventDefault();
    setId(index);
  };
  return (
    <Container>
      <BasicModal open={open} setOpen={setOpen} idx={id} width={1000}>
        {/* <Assignment id={id} /> */}
        <ProgressForm id={id} status={stage} ncrdata={data} />
        {/* <Populate /> */}
      </BasicModal>
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
