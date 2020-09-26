import React from "react";
import Header from "../header";

import { NameTitleWrapper } from "../wrapper";
import { shared_title } from "../title";

import TitleImg from "../../img/title.png";
import Contact from "./contact";
import About from "./about";
import Projects from "./projects";

import styled from "styled-components";

const SubHeading = styled.div`
  font: bold 30px Montserrat, sans-serif;
  position: relative;
  top: 100px;
  padding-left: 10px;
  color: white;
`;

const Jonathan = styled.div`
  ${shared_title}
  font: bold 70px Montserrat, sans-serif;
  position: relative;
  height: 100px;
  background-position: left 19px top 40px;
  white-space: pre;
`;

const Li = styled.div`
  ${shared_title}
  font: bold 70px Montserrat, sans-serif;
  color: #ff3d0d;
  position: absolute;
  top: 290px;
  background-position: left 19px top 0px;
  height: 90px;
  white-space: pre;
`;

const TitlePage = styled.div`
  top: 0;
  left: 0;
  height: 70vh;
  width: 100vw;
  padding: 0;
`;

const FrontPage = styled.div`
  display: flex;
  flex-direction: row;
  background: #262626;
`;

const TitleImage = styled.img`
  position: relative;
  height: 70vh;
  width: 70vh;
  float: right;
  margin-right: 15vw;
  margin-top: 120px;
  filter: saturate(105%);
  transition: 0.8s;
  transform: translateY(0);
  z-index: 10;
  margin-left: -100px;
`;

const Bridge = styled.div`
  position: relative;
  height: 30vh;
  display: block;
  background: rgb(38, 38, 38);
  background: -moz-linear-gradient(
    180deg,
    rgba(38, 38, 38, 1) 0%,
    rgba(29, 29, 29, 1) 100%
  );
  background: -webkit-linear-gradient(
    180deg,
    rgba(38, 38, 38, 1) 0%,
    rgba(29, 29, 29, 1) 100%
  );
  background: linear-gradient(
    180deg,
    rgba(38, 38, 38, 1) 0%,
    rgba(29, 29, 29, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#262626", endColorstr="#1d1d1d", GradientType=1);
`;

const Home = () => {
  const mappings: Array<[string, React.FunctionComponent]> = [
    ["about", About],
    ["projects", Projects],
    ["contact", Contact],
  ];

  let other_pages = new Array(0);
  for (const [id_name, Page] of mappings) {
    other_pages.push(
      <div key={id_name} id={id_name}>
        <Page></Page>
      </div>
    );
  }

  return (
    <div id="master">
      <Header />
      <div>
        <FrontPage>
          <TitlePage>
            <NameTitleWrapper>
              <Jonathan>
                <div>JONATHAN </div>
              </Jonathan>
              <Li>
                <div>LI </div>
              </Li>
              <SubHeading>I Delight in Coding</SubHeading>
            </NameTitleWrapper>
          </TitlePage>
          <TitleImage src={TitleImg} alt=""></TitleImage>
        </FrontPage>
        <Bridge></Bridge>
        {other_pages}
      </div>
    </div>
  );
};

export default Home;
