import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
	name: "detail",
	initialState: {
		detail: {},
		chapterContent: {},
		newChaptter: [],
		listChapter: [],
		listPostSame: [],
		listComment: [],
		isLoadding: true,
		isLoaddingChapter: true,
	},
	reducers: {
		getDetail(state, action) {
			state.detail = action.payload;
		},
		getNewChapter(state, action) {
			state.newChaptter = action.payload;
		},
		getListChapter(state, action) {
			state.listChapter = action.payload;
		},
		getListPostSame(state, action) {
			state.listPostSame = action.payload;
		},
		getListComment(state, action) {
			let listComment = action.payload;
			listComment.forEach((comment) => {
				if (comment.id_parent !== null) {
					let parent = listComment.find(
						(item) => item.id === comment.id_parent
					);
					if (!parent.children) {
						parent.children = [];
					}
					parent.children.push(comment);
				}
			});
			state.listComment = listComment.filter((item) => item.id_parent === null);
		},
		addComment(state, action) {
			if (action.payload.id_parent) {
				const idParent = action.payload.id_parent;
				const index = state.listComment.findIndex((x) => x.id === idParent);
				if (index >= 0) {
					if (
						typeof state.listComment[index].children === "undefined" ||
						state.listComment[index].children === null
					) {
						state.listComment[index].children = [];
					}
					state.listComment[index].children.unshift(action.payload);
				}
			} else {
				state.listComment.unshift(action.payload);
			}
		},
		updateCommentStore(state, action) {
			const { id, content, id_parent } = action.payload;
			if (!id_parent) {
				const index = state.listComment.findIndex((x) => x.id === id);
				if (index >= 0) {
					state.listComment[index].content = content;
				}
			} else if (id_parent) {
				const index = state.listComment.findIndex((x) => x.id === id_parent);
				if (index >= 0) {
					const newIndex = state.listComment[index].children.findIndex(
						(x) => x.id === id
					);
					if (newIndex >= 0) {
						state.listComment[index].children[newIndex].content = content;
					}
				}
			}
		},
		deleteCommentStore(state, action) {
			const { id, id_parent } = action.payload;
			if (!id_parent) {
				state.listComment = state.listComment.filter((item) => item.id !== id);
			} else {
				const index = state.listComment.findIndex((x) => x.id === id_parent);
				if (index >= 0) {
					state.listComment[index].children = state.listComment[
						index
					].children.filter((item) => item.id !== id);
				}
			}
		},
		getChapterContent(state, action) {
			state.chapterContent = action.payload;
		},
		setLoadding(state, action) {
			state.isLoadding = action.payload;
		},
		setLoaddingChapter(state, action) {
			state.isLoaddingChapter = action.payload;
		},
	},
});

export const {
	getDetail,
	getNewChapter,
	getListChapter,
	getListPostSame,
	addComment,
	getListComment,
	getChapterContent,
	setLoadding,
	setLoaddingChapter,
	updateCommentStore,
	deleteCommentStore,
} = detailSlice.actions;

export default detailSlice.reducer;
