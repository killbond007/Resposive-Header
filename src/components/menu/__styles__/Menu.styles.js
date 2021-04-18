import styled, { css } from "styled-components";

export const Root = styled.ul`
  width: 100%;
  line-height: 46px;
  height: 48px;
  border: 0;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: none;
  text-align: left;
  list-style: none;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

export const MenuItem = styled.li`
  display: inline-flex;
  align-items: center;
  margin: -1px 20px 0;
  cursor: pointer;
  ${({ $isSelected }) =>
    $isSelected
      ? css`
          color: #1890ff;
          border-bottom: 2px solid #1890ff;
        `
      : css`
          color: #000000d9;
        `};
`;

export const Title = styled.span`
  font-size: 14px;
  display: ${({ $isVisible }) => ($isVisible ? "inline-block" : "none")};
`;
