import { FC, Children } from 'react';
import { Col, Row } from 'antd';

const BodyTemplate: FC = ({ children }) => {

  return (
    <Row
      gutter={[16, 16]}
    >
      {
        Children.map(children, (child, i) => (
          <Col md={{ span: 24 }} key={i}>
            {child}
          </Col>
        ))
      }
    </Row>
  );
};

export default BodyTemplate;
