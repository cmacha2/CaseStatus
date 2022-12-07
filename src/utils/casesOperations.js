import { API } from "aws-amplify";
import {
  createCase as createCaseMutation,
  deleteCase as deleteCaseMutation,
  updateCase as updateCaseMutation,
} from "../graphql/mutations";
import { listCases } from "../graphql/queries";
import { checkStatus } from "./checkStatusCase";

export const createCase = async (caseNumber, authorID) => {
  try {
    const data = await checkStatus(caseNumber);
    if (data?.error) {
      return { error: "Case not found" };
    }
    if(data?.warning){
      return {warning: "USCIS page not available at this time"};
    }
    const newCase = await API.graphql({
      query: createCaseMutation,
      variables: {
        input: {
          titleCase: data.titleCase,
          description: data.description,
          receiptNumber: data.receiptNumber,
          typeForm: data.typeForm,
          receiptDate: data.receiptDate,
          userCasesId: authorID,
        },
      },
    });
    console.log("case created success");
    const newCaseCreated = {
      titleCase: newCase.data.createCase.titleCase,
      description: newCase.data.createCase.description,
      receiptNumber: newCase.data.createCase.receiptNumber,
      typeForm: newCase.data.createCase.typeForm,
      receiptDate: newCase.data.createCase.receiptDate,
      id: newCase.data.createCase.id,
      createdAt: newCase.data.createCase.createdAt,
      updateAt: newCase.data.createCase.updateAt || new Date().toISOString(),
    };
    return newCaseCreated;
  } catch (error) {
    return { error: "Case not created" };
  }
};

export const deleteCase = async (caseID) => {
  try {
    await API.graphql({
      query: deleteCaseMutation,
      variables: {
        input: {
          id: caseID,
        },
      },
    });
    console.log("case deleted successfully");
  } catch (e) {
    console.log("error deleting case");
  }
};

export const updateCase = async (
  caseID,
  titleCase,
  description,
  receiptNumber,
  typeForm,
  receiptDate
) => {
  try {
    const updatCase = await API.graphql({
      query: updateCaseMutation,
      variables: {
        input: {
          id: caseID,
          titleCase: titleCase,
          description: description,
          receiptNumber: receiptNumber,
          typeForm: typeForm,
          receiptDate: receiptDate,
        },
      },
    });
    console.log("case updated successfully");
    const newCaseUpdate = {
      titleCase: updatCase.data.updateCase.titleCase,
      description: updatCase.data.updateCase.description,
      receiptNumber: updatCase.data.updateCase.receiptNumber,
      typeForm: updatCase.data.updateCase.typeForm,
      receiptDate: updatCase.data.updateCase.receiptDate,
      id: updatCase.data.updateCase.id,
      updateAt: updatCase.data.updateCase.updateAt || new Date().toISOString(),
    };
    return newCaseUpdate;
  } catch (e) {
    console.log("error updating case");
  }
};

export const StatusAllCases = async (cases) => {
  try {
    let casesStatus = [];

    const receiptNumbers = cases.map((item) => item.receiptNumber);
    for (let i = 0; i < receiptNumbers.length; i++) {
      const data = await checkStatus(receiptNumbers[i]);
      if (data?.error) {
        return { error: "Case not found" };
      }
      const newCaseUpdate = await updateCase(
        cases[i].id,
        data.titleCase,
        data.description,
        data.receiptNumber,
        data.typeForm,
        data.receiptDate
      );
      casesStatus.push(newCaseUpdate);
    }
    return casesStatus;
  } catch (e) {
    console.log("error updating case");
  }
};

// const casesChecked = cases.filter(async (caseNumber) => {
//   const response = await checkStatus(caseNumber.receiptNumber);
//   if (response?.error) {
//     return false
//   }
//   return true
// });
// console.log(casesChecked);
// const newCases = casesChecked.filter(async (cas) =>{
//  const {newCaseUpdate} = await updateCase(cas.id, cas.titleCase, cas.description, cas.receiptNumber, cas.typeForm, cas.receiptDate)
//  if(newCaseUpdate){
//    return true
//  }
// });

export const getReceiptsNumbers = async () => {
  try {
    const { data } = await API.graphql({
      query: listCases,
    });
    const receiptNumbers = data.listCases.items.map((item) => {
      return item.receiptNumber;
    });
    return receiptNumbers;
  } catch (error) {
    console.log(error);
  }
};
