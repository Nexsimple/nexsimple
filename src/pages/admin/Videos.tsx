import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Plus, Trash2, Edit, ArrowUp, ArrowDown } from 'lucide-react';

interface Video {
  id: string;
  video_id: string;
  title: string;
  description: string | null;
  section: string | null;
  order_index: number;
  active: boolean;
}

const Videos = () => {
  const { isLoading } = useAdminAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    video_id: '',
    title: '',
    description: '',
    section: '',
    active: true,
  });

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('youtube_videos')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      toast.error('Erro ao carregar vídeos');
      console.error(error);
    } else {
      setVideos(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingVideo) {
      const { error } = await supabase
        .from('youtube_videos')
        .update(formData)
        .eq('id', editingVideo.id);

      if (error) {
        toast.error('Erro ao atualizar vídeo');
        console.error(error);
      } else {
        toast.success('Vídeo atualizado');
        resetForm();
        loadVideos();
      }
    } else {
      const maxOrder = Math.max(...videos.map(v => v.order_index), -1);
      const { error } = await supabase
        .from('youtube_videos')
        .insert({ ...formData, order_index: maxOrder + 1 });

      if (error) {
        toast.error('Erro ao adicionar vídeo');
        console.error(error);
      } else {
        toast.success('Vídeo adicionado');
        resetForm();
        loadVideos();
      }
    }
  };

  const deleteVideo = async (id: string) => {
    const { error } = await supabase
      .from('youtube_videos')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Erro ao deletar vídeo');
      console.error(error);
    } else {
      toast.success('Vídeo deletado');
      loadVideos();
    }
  };

  const toggleActive = async (id: string, active: boolean) => {
    const { error } = await supabase
      .from('youtube_videos')
      .update({ active })
      .eq('id', id);

    if (error) {
      toast.error('Erro ao atualizar status');
      console.error(error);
    } else {
      loadVideos();
    }
  };

  const moveVideo = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = videos.findIndex(v => v.id === id);
    if (currentIndex === -1) return;
    
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= videos.length) return;

    const updates = [
      supabase.from('youtube_videos').update({ order_index: videos[targetIndex].order_index }).eq('id', videos[currentIndex].id),
      supabase.from('youtube_videos').update({ order_index: videos[currentIndex].order_index }).eq('id', videos[targetIndex].id)
    ];

    await Promise.all(updates);
    loadVideos();
  };

  const resetForm = () => {
    setFormData({ video_id: '', title: '', description: '', section: '', active: true });
    setEditingVideo(null);
    setIsDialogOpen(false);
  };

  const startEdit = (video: Video) => {
    setEditingVideo(video);
    setFormData({
      video_id: video.video_id,
      title: video.title,
      description: video.description || '',
      section: video.section || '',
      active: video.active,
    });
    setIsDialogOpen(true);
  };

  if (isLoading || loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vídeos</h1>
          <p className="text-muted-foreground">Gerencie os vídeos do YouTube</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Vídeo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingVideo ? 'Editar' : 'Adicionar'} Vídeo</DialogTitle>
              <DialogDescription>
                Preencha as informações do vídeo do YouTube
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="video_id">ID do Vídeo do YouTube</Label>
                <Input
                  id="video_id"
                  placeholder="ex: dQw4w9WgXcQ"
                  value={formData.video_id}
                  onChange={(e) => setFormData({ ...formData, video_id: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Seção</Label>
                <Input
                  id="section"
                  placeholder="ex: Tutoriais"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
                <Label htmlFor="active">Vídeo ativo</Label>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {videos.map((video, index) => (
          <Card key={video.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {video.title}
                    {!video.active && <span className="text-xs text-muted-foreground">(Inativo)</span>}
                  </CardTitle>
                  {video.section && (
                    <CardDescription>{video.section}</CardDescription>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveVideo(video.id, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveVideo(video.id, 'down')}
                    disabled={index === videos.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Switch
                    checked={video.active}
                    onCheckedChange={(checked) => toggleActive(video.id, checked)}
                  />
                  <Button variant="ghost" size="icon" onClick={() => startEdit(video)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir este vídeo?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteVideo(video.id)}>
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${video.video_id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {video.description && (
                <p className="mt-4 text-sm text-muted-foreground">{video.description}</p>
              )}
            </CardContent>
          </Card>
        ))}

        {videos.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              Nenhum vídeo cadastrado
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Videos;
