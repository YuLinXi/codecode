#define InitSize 10
#define ElemType int

typedef int Data[];
typedef struct
{
  ElemType *data;
  int length, MaxSize;
} SeqList;

void InitSeqList(SeqList &L)
{
  L.data = new ElemType[InitSize];
  L.length = 0;
  L.MaxSize = InitSize;
}

void IncreaseSize(SeqList &L, int len) {
  int *p = L.data;
  L.MaxSize = L.MaxSize + len;
  L.data = new ElemType[L.MaxSize];
  for (int i = 0; i < L.length; i++) {
    L.data[i] = p[i];
  }
  delete p;
}

void AddElem(SeqList &L, int value) {
  if (L.length == L.MaxSize) {
    IncreaseSize(L, 10);
  }
  L.data[L.length++] = value;
}

bool ListInsert(SeqList &L, int i, ini e) {
  if (i < 1 || i > L.length + 1) {
    return false;
  }
  if (L.length >= L.MaxSize) {
    return false;
  }
  for (int j = L.length; j >= i; j--) {
    L.data[j] = L.data[j - 1];
  }
  L.data[i - 1] = e;
  L.length++;
  return true;
}

bool ListDelete(SeqList &L, int i, int &e) {
  if (i < 1 || i > L.length + 1) {
    return false;
  }
  e = L.data[i - 1];
  for (int j = i - 1; j < L.length - 1; j ++) {
    L.data[j] = L.data[j + 1];
  }
  L.length--;
  return true;
}

ElemType GetElem(SeqList &L, int i) {
  return L.data[i - 1];
}

int Locate(SeqList &L, int ElemType e) {
  for (int i = 0; i < L.length; i++) {
    if (L.data[i] == e) {
      return i + 1;
    }
  }
  return 0;
}