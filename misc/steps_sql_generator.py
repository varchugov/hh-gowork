'''Steps SQL Generator

This script allows the user to generate SQL queries to insert data into steps table.

Requirements: 
 - python3.6.8+
 - tkinter for python3

'''

from tkinter import *
from tkinter import filedialog
import json


def on_key_release(event):
    ctrl = (event.state & 0x4) != 0
    if event.keycode == 88 and ctrl and event.keysym.lower() != "x":
        event.widget.event_generate("<<Cut>>")

    if event.keycode == 86 and ctrl and event.keysym.lower() != "v":
        event.widget.event_generate("<<Paste>>")

    if event.keycode == 67 and ctrl and event.keysym.lower() != "c":
        event.widget.event_generate("<<Copy>>")


def generate_answer(answer_id, answer_text):
    answer = dict()
    answer['id'] = answer_id
    answer['answer'] = answer_text
    return answer


class App:

    TEMPLATE = "INSERT INTO steps (paragraph_id, theory, question, correct_answers, answers_explanations, has_answer)" \
               " VALUES ({paragraph_id}, '{theory}', '{question}'," \
               " '{correct_answers}', '{answers_explanations}', {has_answer});\n"

    DUMMY_SIZE = 20

    def remove_answer(self, num):
        self.answers_dict[num]['ans_frame'].destroy()
        del self.answers_dict[num]
        if len(self.answers_dict) == 0:
            self.number_of_answers = 0

    def add_answer(self):
        answer_index = self.number_of_answers + 1
        answer_frame = Frame(self.question_answer_frame)
        answer_dict = dict()

        check_var = IntVar()
        check_var.set(0)
        correct_answer = Checkbutton(answer_frame, variable=check_var, text='correct answer')
        correct_answer.grid(row=0, column=0)
        answer_dict['check_button'] = check_var

        answer = Entry(answer_frame)
        answer.grid(row=0, column=1)
        answer_dict['entry'] = answer

        delete_button = Button(answer_frame, text='Remove', command=lambda num=answer_index: self.remove_answer(num))
        delete_button.grid(row=0, column=2, padx=3)
        answer_dict['del_button'] = delete_button

        answer_frame.pack()
        answer_dict['ans_frame'] = answer_frame

        self.answers_dict[answer_index] = answer_dict
        self.number_of_answers += 1

    def generate_question(self):
        question = dict()
        answers_list = list()
        question['type'] = self.answer_variable.get()
        question['button'] = self.e_button.get()
        i = 0
        for k, v in self.answers_dict.items():
            answers_list.append(generate_answer(i, v['entry'].get()))
            i += 1
        question['answers'] = answers_list
        return json.dumps(question, ensure_ascii=False)

    def generate_explanations(self):
        explanation = dict()
        explanation['correct'] = self.e_correct_answer.get()
        explanation['wrong'] = self.e_wrong_answer.get()
        return json.dumps(explanation, ensure_ascii=False)

    def generate_correct_answers(self):
        result_list = list()
        if self.answer_variable.get() not in ('free', 'empty'):
            if len(self.answers_dict) != 0:
                i = 0
                for k, v in self.answers_dict.items():
                    if v['check_button'].get() == 1:
                        result_list.append(i)
                    i += 1
        return result_list

    def generate_sql(self, event=None):
        sql_request = self.TEMPLATE.format(
            paragraph_id=self.e_paragraph_id.get(),
            theory=self.e_theory.get(),
            question=self.generate_question(),
            correct_answers=self.generate_correct_answers(),
            answers_explanations=self.generate_explanations(),
            has_answer='TRUE' if self.answer_variable.get() in ('checkbox', 'radiobutton') else 'FALSE')

        with open(self.e_file_name.get(), 'a', encoding='utf-8') as file:
            file.write(sql_request)

    def reset_fields(self):
        self.e_paragraph_id.delete(0, END)
        self.e_theory.delete(0, END)
        self.e_button.delete(0, END)
        self.answer_variable.set('empty')

        for i in self.answers_dict:
            self.answers_dict[i]['ans_frame'].destroy()
        self.answers_dict.clear()

        self.number_of_answers = 0
        self.e_correct_answer.delete(0, END)
        self.e_wrong_answer.delete(0, END)

    def browse_files(self):
        filename = filedialog.askopenfilename(title='Select a file')
        if filename:
            self.e_file_name.delete(0, END)
            self.e_file_name.insert(0, filename)

    def __init__(self, master):
        self.master = master
        self.answers_dict = dict()
        self.number_of_answers = 0
        self.has_answer_var = IntVar()
        self.has_answer_var.set(0)

        self.dummy1 = Frame(self.master, width=1, height=self.DUMMY_SIZE/2, borderwidth=0)
        self.dummy1.pack()

        # open file frame
        self.open_file_frame = Frame(self.master)

        self.l_file_name = Label(self.open_file_frame, text="Current file: ")
        self.l_file_name.grid(row=0, column=0)
        self.b_file_name = Button(self.open_file_frame, text='Select file', command=self.browse_files)
        self.b_file_name.grid(row=0, column=3)
        self.e_file_name = Entry(self.open_file_frame)
        self.e_file_name.insert(0, 'data.sql')
        self.e_file_name.grid(row=0, column=2)

        self.open_file_frame.pack()

        self.dummy1 = Frame(self.master, width=1, height=self.DUMMY_SIZE, borderwidth=0)
        self.dummy1.pack()

        # paragraph theory button frame
        self.paragraph_theory_button_frame = Frame(self.master)

        self.l_paragraph_id = Label(self.paragraph_theory_button_frame, text="paragraph_id")
        self.l_paragraph_id.grid(row=0, column=0)
        self.e_paragraph_id = Entry(self.paragraph_theory_button_frame)
        self.e_paragraph_id.grid(row=0, column=1)

        self.l_theory = Label(self.paragraph_theory_button_frame, text="theory")
        self.l_theory.grid(row=1, column=0)
        self.e_theory = Entry(self.paragraph_theory_button_frame)
        self.e_theory.grid(row=1, column=1)

        self.l_button = Label(self.paragraph_theory_button_frame, text="button")
        self.l_button.grid(row=2, column=0)
        self.e_button = Entry(self.paragraph_theory_button_frame)
        self.e_button.grid(row=2, column=1)

        self.paragraph_theory_button_frame.pack()

        self.dummy2 = Frame(self.master, width=1, height=self.DUMMY_SIZE, borderwidth=0)
        self.dummy2.pack()

        # question frame
        self.question_frame = Frame(self.master)

        # question type frame
        self.question_type_frame = Frame(self.question_frame)

        self.l_question = Label(self.question_type_frame, text="question")
        self.l_question.grid(row=0, column=0)

        self.choices = ['checkbox', 'radiobutton', 'free', 'empty']
        self.answer_variable = StringVar(root)
        self.answer_variable.set('empty')
        self.om_question = OptionMenu(self.question_type_frame, self.answer_variable, *self.choices)
        self.om_question.config(width=10)
        self.om_question.grid(row=0, column=1, sticky="ew")

        self.b = Button(self.question_type_frame, text='Add Answer', command=self.add_answer)
        self.b.grid(row=0, column=2)

        self.question_type_frame.pack()

        # question answer frame
        self.question_answer_frame = Frame(self.question_frame)
        self.tiny_dummy = Frame(self.question_answer_frame, width=1, height=1, borderwidth=0)
        self.tiny_dummy.pack()
        self.question_answer_frame.pack()

        self.question_frame.pack()

        self.dummy3 = Frame(self.master, width=1, height=self.DUMMY_SIZE, borderwidth=0)
        self.dummy3.pack()

        # answer explanation frame
        self.answer_explanation_frame = Frame(self.master)

        self.l_ans_explanation = Label(self.answer_explanation_frame, text="answer explanation")
        self.l_ans_explanation.pack()

        self.correct_wrong_frame = Frame(self.answer_explanation_frame)

        self.l_correct_answer = Label(self.correct_wrong_frame, text="correct")
        self.l_correct_answer.grid(row=0, column=0)
        self.e_correct_answer = Entry(self.correct_wrong_frame)
        self.e_correct_answer.grid(row=0, column=1)

        self.l_wrong_answer = Label(self.correct_wrong_frame, text="wrong")
        self.l_wrong_answer.grid(row=1, column=0)
        self.e_wrong_answer = Entry(self.correct_wrong_frame)
        self.e_wrong_answer.grid(row=1, column=1)

        self.correct_wrong_frame.pack()

        self.answer_explanation_frame.pack()

        self.dummy4 = Frame(self.master, width=1, height=self.DUMMY_SIZE, borderwidth=0)
        self.dummy4.pack()

        # buttons frame
        self.buttons_frame = Frame(self.master)

        self.b = Button(self.buttons_frame, text='Generate', command=self.generate_sql, height=2, width=10)
        self.b.grid(row=0, column=0)

        self.button_dummy = Frame(self.buttons_frame, width=15, height=1, borderwidth=0)
        self.button_dummy.grid(row=0, column=1)

        self.b = Button(self.buttons_frame, text='Reset', command=self.reset_fields)
        self.b.grid(row=0, column=2)

        self.buttons_frame.pack()


if __name__ == '__main__':
    root = Tk()
    root.title('Steps SQL generator')
    root.geometry("800x500+300+300")
    root.bind_all('<Key>', on_key_release, '+')
    app = App(root)
    root.mainloop()
