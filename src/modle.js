import React, { useState } from "react";
import { Modal, Button } from "carbon-components-react";
import DataTable from "./DataTable";
import "./modle.css";

const modal = () => {
  const [isModleOpen, setIsModleOpen] = useState(false);

  const openModle = () => {
    setIsModleOpen(true);
  };

  return (
    <div>
      <Modal
        hasScrollingContent
        size="lg"
        open={isModleOpen}
        onRequestClose={() => setIsModleOpen(false)}
        modalHeading="Create Table"
        primaryButtonText="Send"
        secondaryButtonText="Cancl"
      >
        <div>
          <DataTable />
        </div>
      </Modal>
      <Button onClick={openModle}>Open</Button>
    </div>
  );
};
export default modal;
