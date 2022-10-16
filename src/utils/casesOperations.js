import { API } from "aws-amplify";
import {
  createCase as createCaseMutation,
  deleteCase as deleteCaseMutation,
} from "../graphql/mutations";
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
