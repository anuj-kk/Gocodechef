import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";

const List = () => {
return (
<MDBContainer>
  <MDBListGroup style={{ width: "22rem" }}>
    <MDBListGroupItem href="#" active>Cras justo odio</MDBListGroupItem>
    <MDBListGroupItem href="#" hover>Dapibus ac facilisis in</MDBListGroupItem>
    <MDBListGroupItem href="#" hover>Morbi leo risus</MDBListGroupItem>
    <MDBListGroupItem href="#" hover>Porta ac consectetur ac</MDBListGroupItem>
    <MDBListGroupItem href="#" disabled>Vestibulum at eros</MDBListGroupItem>
  </MDBListGroup>
</MDBContainer>

);
};

export default List;