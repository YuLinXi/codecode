#define InitSize 10

typedef int ElemType;
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

void IncreateSize(SeqList &L, int len) {
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
    IncreateSize(L, 10);
  }
  L.data[L.length++] = value;
}