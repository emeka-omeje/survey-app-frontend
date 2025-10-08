import React from "react";
import toast from "react-hot-toast";
import {
  AvailableQuestionForPiping,
  QuestionFrameProps,
  UsePipingArgs,
} from "../dataTypes";


export const usePipingHandleFxns = ({
  sections,
  getQuestionNumber,
  receiverText,
  setReceiverText,
  delimiter,
  fallback,
  setSections,
  selectedQuestionId,
  // setSelectedQuestionId,
 }: UsePipingArgs) => {
  const availableQuestions: AvailableQuestionForPiping[] = React.useMemo(() => {
    return (sections || []).flatMap((s, sIdx) =>
      s.questionFrames.map((q: QuestionFrameProps, qIdx: number) => ({
        id: q.id,
        qNumb: getQuestionNumber(sIdx, qIdx, sections.length),
        text: q.questionText || "Untitled question",
        label: `${getQuestionNumber(sIdx, qIdx, sections.length)} — ${
          q.questionText || "Untitled"
        }`,
      }))
    );
  }, [sections, getQuestionNumber]);

  const getAnswerForQuestion = React.useCallback(
    (questionId: string) => {
      for (const s of sections || []) {
        const q = s.questionFrames.find(
          (x: QuestionFrameProps) => x.id === questionId
        );
        if (q) return q.questionText ?? q.assignedPoint ?? "";
      }
      return "";
    },
    [sections]
  );

  const preview = React.useMemo(() => {
    console.log("previewing...", receiverText);
    let text = receiverText;
    const tokenRegex = /{{\s*([^}]+)\s*}}/g;
    text = text.replace(tokenRegex, (_match: string, token: string) => {
      const q = availableQuestions.find(
        (aq: AvailableQuestionForPiping) =>
          aq.id === token ||
          aq.label.startsWith(token) ||
          aq.label.includes(token)
      );
      if (q) {
        const source = getAnswerForQuestion(q.id);
        if (source == null || source === "") return fallback;
        if (Array.isArray(source)) return source.join(delimiter);
        return String(source);
      }
      if (/^Q\d+$/i.test(token)) {
        const num = Number(token.replace(/[^0-9]/g, ""));
        const idx = num - 1;
        if (availableQuestions[idx]) {
          const source = getAnswerForQuestion(availableQuestions[idx].id);
          if (source == null || source === "") return fallback;
          if (Array.isArray(source)) return source.join(delimiter);
          return String(source);
        }
      }
      return fallback;
    });
    return text;
  }, [
    receiverText,
    availableQuestions,
    delimiter,
    fallback,
    getAnswerForQuestion,
  ]);

  const insertTokenFor = (qId: string) => {
    const sourcedQuestion = availableQuestions.find((a) => a.id === qId);
    const token = sourcedQuestion
      ? `{{${sourcedQuestion.qNumb}}}`
      : `{{${qId}}}`;
    // Do NOT persist into sections from here. Only update the local receiver buffer.
    console.log("insertTokenFor", qId, token);
    setReceiverText((t) => (t ? `${t} ${token}` : token));
  };

  // Handlers moved from the PipingLogic component so other components/tests can reuse them.
  const handleEditorChange = (value: string, markTouched?: (v: boolean) => void) => {
    setReceiverText(value);
    if (markTouched) markTouched(true);
  };

  const handleSaveQuestionText = () => {
    if (!selectedQuestionId || !setSections) return;
    setSections((prev) =>
      prev.map((s) => ({
        ...s,
        questionFrames: s.questionFrames.map((q) =>
          q.id === selectedQuestionId ? { ...q, questionText: receiverText } : q
        ),
      }))
    );
  };

  const handleResetEditor = () => {
    if (!selectedQuestionId) {
      setReceiverText("");
      return;
    }
    const aq = availableQuestions.find((a) => a.id === selectedQuestionId);
    setReceiverText(aq ? aq.text : "");
  };

  const handleCopyTemplate = async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API not available");
      await navigator.clipboard.writeText(receiverText);
      toast.success("Template copied to clipboard");
    } catch (err) {
      console.error("Copy failed", err);
      toast.error("Could not copy template");
    }
  };

  return {
    availableQuestions,
    getAnswerForQuestion,
    preview,
    insertTokenFor,
    handleCopyTemplate,
    // moved handlers
    handleEditorChange,
    handleSaveQuestionText,
    handleResetEditor,
  };
};

export default usePipingHandleFxns;
