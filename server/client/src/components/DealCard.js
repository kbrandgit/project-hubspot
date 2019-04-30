import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

export class DealCard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="header-div">
          <h2>Deals</h2>
        </div>
        <Draggable draggableId={this.props.deal.id} index={this.props.index}>
          {(provided, snapshot) => (
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              {this.props.deal.dealName}
            </Container>
          )}
        </Draggable>
      </React.Fragment>
    );
  }
}

const Container = styled.div`
  background-color: ${props => (props.isDragging ? "#eee" : "white")};
  transition: background-color 0.2s ease;
  border: 1px solid #5cff7a;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
`;

export default DealCard;
