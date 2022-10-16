import { API } from "aws-amplify";
import { createCase as createCaseMutation } from "../graphql/mutations";
import { checkStatus } from "./checkStatusCase";

export const createCase = async (caseNumber, authorID) => {
  try {
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
        },
      },
    });
    console.log("case created success");
    const newCaseCreated = {
      receiptNumber: newCase.data.createCase.receiptNumber,
      receiptDate: newCase.data.createCase.receiptDate,
      titleCase: newCase.data.createCase.titleCase,
      description: newCase.data.createCase.description,
      typeForm: newCase.data.createCase.typeForm,
      id: newCase.data.createCase.id,
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
