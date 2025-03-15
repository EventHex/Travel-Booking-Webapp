// import React from 'react';
// import styled from 'styled-components';

// const CardContainer = styled.div`
//   width: 954px;
//   height: 336px;
//   border-radius: 26px;
//   background: rgba(250, 249, 255, 0.9);
//   backdrop-filter: blur(28.8px);
//   border: 1px solid rgba(189, 202, 255, 0.8);
//   display: flex;
//   position: relative;
//   overflow: hidden;
//   margin: 0 auto;

//   &::before, &::after {
//     content: '';
//     position: absolute;
//     width: 26px;
//     height: 13px;
//     background-color: white;
//     left: 348px;
//     z-index: 1;
//   }

//   &::before {
//     top: -6.5px;
//     border-bottom-left-radius: 13px;
//     border-bottom-right-radius: 13px;
//     border-bottom: 1px solid rgba(189, 202, 255, 0.8);
//     border-left: 1px solid rgba(189, 202, 255, 0.8);
//     border-right: 1px solid rgba(189, 202, 255, 0.8);
//   }

//   &::after {
//     bottom: -6.5px;
//     border-top-left-radius: 13px;
//     border-top-right-radius: 13px;
//     border-top: 1px solid rgba(189, 202, 255, 0.8);
//     border-left: 1px solid rgba(189, 202, 255, 0.8);
//     border-right: 1px solid rgba(189, 202, 255, 0.8);
//   }
// `;

// const VerticalDivider = styled.div`
//   position: absolute;
//   width: 1px;
//   height: 280px;
//   background-color: rgba(205, 207, 213, 0.8);
//   left: 360px;
//   top: 29px;
// `;

// const ContentWrapper = styled.div`
//   display: flex;
//   width: 100%;
//   padding: 40px 0 40px 70px;
// `;

// const LeftSection = styled.div`
//   width: 260px;
//   display: flex;
//   flex-direction: column;
//   gap: 30px;
// `;

// const RightSection = styled.div`
//   flex: 1;
//   margin-left: 90px;
//   display: flex;
//   flex-direction: column;
// `;

// const NameSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
// `;

// const ApplicantName = styled.h1`
//   font-size: 24px;
//   font-weight: 600;
//   line-height: 28px;
//   color: #0A0D14;
//   margin: 0;
// `;

// const SubmissionDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 13px;
// `;

// const SubmissionInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
// `;

// const InfoText = styled.p`
//   font-size: 14px;
//   color: #52575E;
//   margin: 0;
//   line-height: 18px;
// `;

// const CountrySection = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
//   margin-top: 10px;
// `;

// const CountryName = styled.h2`
//   font-size: 16px;
//   font-weight: 600;
//   color: #0A0D14;
//   margin: 0;
// `;

// const VisaDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
// `;

// const ApplicationDetailsSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// const SectionTitle = styled.h2`
//   font-size: 16px;
//   font-weight: 600;
//   color: #0A0D14;
//   margin: 0;
// `;

// const StatusList = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const StatusItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 14px;
//   height: ${props => props.last ? '17px' : '36px'};
// `;

// const StatusIconContainer = styled.div`
//   position: relative;
//   width: 20px;
//   height: ${props => props.last ? '17px' : '36px'};
//   display: flex;
//   align-items: flex-start;
//   justify-content: center;
// `;

// const StatusIcon = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: #38C793;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const VerticalStatusLine = styled.div`
//   position: absolute;
//   top: 20px;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 1px;
//   height: 20px;
//   background-color: #D9D9D9;
// `;

// const StatusLabel = styled.p`
//   font-size: 14px;
//   color: #52575E;
//   margin: 0;
// `;

// const VisaStatusCard = styled.div`
//   background: #ECF1FF;
//   border: 1px solid #3A5DFB;
//   border-radius: 11px;
//   padding: 13px 15px;
//   display: flex;
//   width: 260px;
//   height: 94px;
//   margin-top: 3px;
// `;

// const StatusIcon2 = styled.div`
//   width: 47px;
//   height: 47px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 12px;
// `;

// const StatusContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 11px;
// `;

// const StatusHeaderRow = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 5px;
// `;

// const VisaStatusTitle = styled.h3`
//   font-size: 16px;
//   font-weight: 600;
//   color: #0A0D14;
//   margin: 0;
// `;

// const StatusBadge = styled.span`
//   background-color: #38C793;
//   color: white;
//   padding: 2px 6px;
//   border-radius: 999px;
//   font-size: 12px;
//   font-weight: 500;
//   display: flex;
//   align-items: center;
//   gap: 2px;
// `;

// const DeliveryDetails = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
// `;

// const EstimatedDate = styled.p`
//   font-size: 14px;
//   color: #52575E;
//   margin: 0;
// `;

// const DeliveryDate = styled.p`
//   font-size: 14px;
//   color: #0A0D14;
//   font-weight: 500;
//   margin: 0;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
//   margin-top: 80px;
//   width: 260px;
// `;

// const ButtonRow = styled.div`
//   display: flex;
//   gap: 8px;
// `;

// const Button = styled.button`
//   border: 0.5px solid #3A5DFB;
//   border-radius: 10px;
//   padding: 10px;
//   background-color: transparent;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   font-size: 14px;
//   color: #0A0D14;
//   font-weight: 500;
//   height: 37px;
//   box-shadow: 0px 1px 2px rgba(55, 93, 251, 0.08);
// `;

// const ViewButton = styled(Button)`
//   width: 177px;
// `;

// const InvoiceButton = styled(Button)`
//   width: 75px;
// `;

// const DownloadButton = styled(Button)`
//   width: 100%;
//   background-color: #F0F4FF;
//   color: #3A5DFB;
//   font-weight: 400;
//   border-radius: 25px;
// `;

// const VisaSidebar = styled.div`
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 23px;
//   height: 100%;
//   background-color: #3A5DFB;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
//   writing-mode: vertical-lr;
//   transform: rotate(180deg);
//   font-size: 14px;
//   font-weight: 500;
//   letter-spacing: 1px;
//   padding-bottom: 20px;
// `;

// const CircleButton = styled.div`
//   position: absolute;
//   left: 1px;
//   top: 50%;
//   transform: translateY(-50%);
//   width: 22px;
//   height: 22px;
//   background-color: white;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const CheckMarkIcon = () => (
//   <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M4.00033 8.39993L1.60033 5.99993L0.866699 6.73327L4.00033 9.86659L12.0003 1.86659L11.267 1.13326L4.00033 8.39993Z" fill="#38C793"/>
//   </svg>
// );

// const CheckIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM11.41 6.9L7.65 10.66C7.45 10.86 7.19 10.97 6.91 10.97C6.63 10.97 6.37 10.86 6.17 10.66L4.59 9.08C4.39 8.88 4.28 8.62 4.28 8.34C4.28 8.06 4.39 7.8 4.59 7.6C4.79 7.4 5.05 7.29 5.33 7.29C5.61 7.29 5.87 7.4 6.07 7.6L6.91 8.44L10.06 5.29C10.46 4.89 11.11 4.89 11.51 5.29C11.7 5.49 11.81 5.75 11.81 6.03C11.81 6.29 11.67 6.55 11.41 6.9Z" fill="white"/>
//   </svg>
// );

// const ShieldIcon = () => (
//   <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M23.5 9L10.5 15V23.5C10.5 31.1 16.039 38.154 23.5 40C30.961 38.154 36.5 31.1 36.5 23.5V15L23.5 9Z" fill="#3A5DFB" fillOpacity="0.6" stroke="white" strokeWidth="0.5"/>
//     <path d="M23.5 15L16.5 18.5V23.5C16.5 27.735 19.471 31.618 23.5 32.7C27.529 31.618 30.5 27.735 30.5 23.5V18.5L23.5 15Z" fill="#3A5DFB" stroke="white" strokeWidth="0.3"/>
//     <path d="M21.5 23.5L24 26L26.5 23.5" stroke="white" strokeWidth="0.5" strokeLinecap="round"/>
//   </svg>
// );

// const VisaCard = () => {
//   return (
//     <CardContainer className="visa-card-container">
//       <VisaSidebar>
//         <CircleButton>
//           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14.4C4.472 14.4 1.6 11.528 1.6 8C1.6 4.472 4.472 1.6 8 1.6C11.528 1.6 14.4 4.472 14.4 8C14.4 11.528 11.528 14.4 8 14.4Z" fill="#3A5DFB"/>
//             <path d="M11.896 5.736L6.4 11.2L4.104 8.904L5.16 7.848L6.4 9.088L10.84 4.68L11.896 5.736Z" fill="#3A5DFB"/>
//           </svg>
//         </CircleButton>
//         Visa Approved
//       </VisaSidebar>
//       <VerticalDivider />

//       <ContentWrapper>
//         <LeftSection>
//           <NameSection>
//             <ApplicantName>SHARIEFA VALIYAKATH CHERIYAMALIYAKKAL</ApplicantName>
//             <SubmissionDetails>
//               <SubmissionInfo>
//                 <InfoText>Submitted on:   Feb 19, 2025</InfoText>
//                 <InfoText>Submitted at:   11:14 AM</InfoText>
//               </SubmissionInfo>
//               <InfoText>Passport Number: V7672497</InfoText>
//             </SubmissionDetails>
//           </NameSection>

//           <CountrySection>
//             <CountryName>United Arab Emirates</CountryName>
//             <VisaDetails>
//               <InfoText>Visa: UAE 30 Days Covid Insurance</InfoText>
//               <InfoText>Travel: Mar 4, 2025 — Mar 20, 2025</InfoText>
//             </VisaDetails>
//           </CountrySection>
//         </LeftSection>

//         <RightSection>
//           <div style={{ display: 'flex', gap: '52px' }}>
//             <ApplicationDetailsSection>
//               <SectionTitle>Application Details</SectionTitle>
//               <StatusList>
//                 <StatusItem>
//                   <StatusIconContainer>
//                     <StatusIcon>
//                       <CheckMarkIcon />
//                     </StatusIcon>
//                     <VerticalStatusLine />
//                   </StatusIconContainer>
//                   <StatusLabel>Erorr Fixed</StatusLabel>
//                 </StatusItem>

//                 <StatusItem>
//                   <StatusIconContainer>
//                     <StatusIcon>
//                       <CheckMarkIcon />
//                     </StatusIcon>
//                     <VerticalStatusLine />
//                   </StatusIconContainer>
//                   <StatusLabel>Application Complete</StatusLabel>
//                 </StatusItem>

//                 <StatusItem>
//                   <StatusIconContainer>
//                     <StatusIcon>
//                       <CheckMarkIcon />
//                     </StatusIcon>
//                     <VerticalStatusLine />
//                   </StatusIconContainer>
//                   <StatusLabel>Application Paid</StatusLabel>
//                 </StatusItem>

//                 <StatusItem>
//                   <StatusIconContainer>
//                     <StatusIcon>
//                       <CheckMarkIcon />
//                     </StatusIcon>
//                     <VerticalStatusLine />
//                   </StatusIconContainer>
//                   <StatusLabel>Submitted to Spencer</StatusLabel>
//                 </StatusItem>

//                 <StatusItem last>
//                   <StatusIconContainer last>
//                     <StatusIcon>
//                       <CheckMarkIcon />
//                     </StatusIcon>
//                   </StatusIconContainer>
//                   <StatusLabel>Visa Approved</StatusLabel>
//                 </StatusItem>
//               </StatusList>
//             </ApplicationDetailsSection>

//             <div style={{ width: '1px', height: '259px', backgroundColor: '#CDCFD5' }} />

//             <div style={{ display: 'flex', flexDirection: 'column' }}>
//               <VisaStatusCard>
//                 <StatusIcon2>
//                   <ShieldIcon />
//                 </StatusIcon2>

//                 <StatusContent>
//                   <StatusHeaderRow>
//                     <VisaStatusTitle>Visa Approved</VisaStatusTitle>
//                     <StatusBadge>
//                       <CheckIcon />
//                       Before Time
//                     </StatusBadge>
//                   </StatusHeaderRow>

//                   <DeliveryDetails>
//                     <EstimatedDate>Estimated on :  Mar 4, 2025</EstimatedDate>
//                     <DeliveryDate>Delivery on  :  Mar 4, 2025</DeliveryDate>
//                   </DeliveryDetails>
//                 </StatusContent>
//               </VisaStatusCard>

//               <ButtonGroup>
//                 <ButtonRow>
//                   <ViewButton>
//                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '4px' }}>
//                       <path d="M12.9167 9.99992L8.91666 13.9999L7.08333 12.1666" stroke="#3A5DFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                     Veiw Application
//                   </ViewButton>
//                   <InvoiceButton>Invioce</InvoiceButton>
//                 </ButtonRow>
//                 <DownloadButton>Downloade inshurence</DownloadButton>
//               </ButtonGroup>
//             </div>
//           </div>
//         </RightSection>
//       </ContentWrapper>
//     </CardContainer>
//   );
// };

// export default VisaCard;

import React from "react";

const VisaCard = () => {
  const statusItems = [
    "Error Fixed",
    "Application Complete",
    "Application Paid",
    "Submitted to Spencer",
    "Visa Approved",
  ];

  return (
    <div className="flex">
      <div className="relative  w-full max-w-[300px] h-56 bg-red-100 rounded-2xl overflow-hidden">
        {/* Left blue sidebar */}
        <div className="absolute top-0 left-0 w-14 h-full bg-blue-600 rounded-l-2xl">
          {/* "Visa Approved" vertical text */}
          <div className="absolute left-7 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-white font-semibold text-sm uppercase tracking-wider">
            Visa Approved
          </div>

          {/* Checkmark icon */}
          <div className="absolute left-7 bottom-7 w-5 h-5 bg-white rounded-full flex justify-center items-center">
            <div className="w-1.5 h-3 border-r-2 border-b-2 border-blue-600 rotate-45 -translate-y-px"></div>
          </div>
        </div>

        {/* Concave corners */}
        <div className="absolute top-0 right-0 w-5 h-5 bg-gray-100 rounded-bl-full"></div>
        <div className="absolute bottom-0 right-0 w-5 h-5 bg-gray-100 rounded-tl-full"></div>

        {/* Card content */}
        <div className="relative pl-20 pr-5 py-5 h-full">
          <div className="text-xl font-bold uppercase leading-tight">
            SHARIEFA VALIYAKATH
            <br />
            CHERIYAMALIYAKKAL
          </div>

          <div className="grid grid-cols-[140px_1fr] gap-y-1 mt-5 text-sm text-gray-600">
            <div>Submitted on:</div>
            <div>Feb 19, 2025</div>
            <div>Submitted at:</div>
            <div>11:14 AM</div>
            <div>Passport Number:</div>
            <div>V7672497</div>
          </div>

          <div className="text-lg font-semibold mt-5">United Arab Emirates</div>

          <div className="text-sm text-gray-600 mt-5">
            Visa: UAE 30 Days Covid Insurance
            <span className="block mt-1">
              Travel: Mar 4, 2025 — Mar 20, 2025
            </span>
          </div>
        </div>
      </div>
      <div className="bg-red-100 rounded-lg p-4 max-w-md relative overflow-hidden">
        {/* Blue top border */}
        <div className="absolute top-0 left-0 w-full h-0 "></div>

        {/* Left dashed border */}
        <div className="absolute top-5 left-0 w-0 h-[calc(100%-10px)] border-l border-dashed border-blue-300"></div>

        {/* Concave corners */}
        <div className="absolute top-0 left-0 w-5 h-5 bg-gray-100 rounded-br-full"></div>
        <div className="absolute bottom-0 left-0 w-5 h-5 bg-gray-100 rounded-tr-full"></div>

        <h2 className="text-lg font-semibold  ml-2">Application Details</h2>

        <div className="bg-blue-50  relative">
          {/* The vertical line connecting the checkmarks */}
          {/* Status items with checkmarks */}
          <div className="space-y-10">
            {statusItems.map((item, index) => (
              <div key={index} className="flex items- m-[5px] relative">
                {/* Green checkmark circle */}
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-4 z-10">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                {/* Status text */}
                <span className="text-gray-600 text-[14px]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const VisaApplication = () => {
  return <VisaCard />;
};

export default VisaApplication;
