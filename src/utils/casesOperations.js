import { API } from "aws-amplify";
import { createCase as createCaseMutation } from "../graphql/mutations";
import { checkStatus } from "./checkStatusCase";

export const createCase = async (caseNumber, authorID) => {
  try {
    console.log(caseNumber, authorID);
    const { titleCase, description, receiptNumber, typeForm, receiptDate } =
      await checkStatus(caseNumber);
    const newCase = await API.graphql({
      query: createCaseMutation,
      variables: {
        input: {
          titleCase,
          description,
          receiptNumber,
          typeForm,
          receiptDate,
          userCasesId: authorID,
        }
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

  } catch (e) {
    console.log(e, "error creating case");
  }
};

// export const deletePost = async (postID) => {
//   try {
//     await API.graphql({
//       query: deleteCaseMutation,
//       variables: {
//         input: {
//           id: postID,
//         },
//       },
//     });
//     console.log("case deleted successfully");
//   } catch (e) {
//     console.log("error deleting case");
//   }
// };
