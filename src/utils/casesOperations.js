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
    if (data.error) {
      return { error: "Case not found" };
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
      updateAt: newCase.data.createCase.updateAt,
    };
    console.log(newCaseCreated.receiptDate);
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

export const updateCase = async (caseID, titleCase, description) => {
  try {
    const updateCase = await API.graphql({
      query: updateCaseMutation,
      variables: {
        input: {
          id: caseID,
          titleCase: titleCase,
          description: description,
        },
      },
    });
    console.log("case updated successfully");
    const newCaseUpdate = {
      titleCase: updateCase.data.updateCase.titleCase,
      description: updateCase.data.updateCase.description,
      receiptNumber: updateCase.data.updateCase.receiptNumber,
      typeForm: updateCase.data.updateCase.typeForm,
      receiptDate: updateCase.data.updateCase.receiptDate,
      id: updateCase.data.updateCase.id,
      updateAt: updateCase.data.updateCase.updateAt,
    };
    return newCaseUpdate;
  } catch (e) {
    console.log("error updating case");
  }
};

export const StatusAllCases = async (cases) => {
  let casesStatus = [];
  try {
    console.log("update cases", cases);
    if (cases.length > 0) {
      cases.map(async (caseNumber) => {
        const response = await checkStatus(caseNumber.receiptNumber);
        if (response.error) {
          return { error: "Case not found" };
        }
        const caseUpdated = await updateCase(
          caseNumber.id,
          response.titleCase,
          response.description
        );
        casesStatus.push(caseUpdated);
      });
      return casesStatus;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getReceiptsNumbers = async () => {
  try {
    const {data} = await API.graphql({
      query: listCases,
    });
    const receiptNumbers = data.listCases.items.map((item) => {
      return item.receiptNumber;
    });
    return receiptNumbers;
  } catch (error) {
    console.log(error);
  }
}












