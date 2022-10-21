import { API, graphqlOperation } from "aws-amplify";
import { deleteComment as deleteCommentMutations } from "../graphql/mutations";


export const deleteComment = async (id) => {
    try {
        await API.graphql({
          query: deleteCommentMutations,
          variables: {
            input: {
              id: id,
            },
          },
        });
        console.log("delete comment successfully");
      } catch (e) {
        console.log("error deleting comment");
      }
}